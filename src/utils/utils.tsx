import { ColorPaletteAsArray, PaletteObj, ShadesType, ShadeType, StatePalettes } from "src/colorPicker/types";
import { Story, Group } from "@storybook/api/dist/ts3.9/lib/stories";

const getInvalidShadeMessage = (paletteName: string, colorLabel: string, shadeLabel: string) => (
    `%cInvalid color value in ${paletteName}: ${colorLabel} -> ${shadeLabel}. It has been removed from palette.`
)

const getInvalidCollorMessage = (paletteName: string, colorName: string) => (
    `%cNo valid colors in ${paletteName} -> ${colorName}. It has been removed from palette.`
)

const getInvalidPaletteMessage = (paletteName: string) => (
    `%cNo valid colors in ${paletteName}. Palette has been removed.`
)

const warn = (message: string) => console.warn(message, 'color: red')

const validateArrayPalette = (paletteObj: PaletteObj) => {
    const palette = paletteObj.palette as ColorPaletteAsArray[]
    const validatedPalette: ColorPaletteAsArray[] = []

    palette.forEach((p, i) => {
        validatedPalette.push({ label: p.label, values: [] })
        const shades: ShadeType[] = []

        p.values.forEach(v => {
            const isValid = CSS.supports('color', v.value)
            if (!isValid) {
                const message = getInvalidShadeMessage(paletteObj.name, p.label, v.label)
                warn(message)
                return
            }
            shades.push(v)
        })

        if (!shades.length) {
            validatedPalette.splice(i, 1)
            const message = getInvalidCollorMessage(paletteObj.name, p.label)
            warn(message)
            return
        }

        validatedPalette[i].values = shades
    })

    if (!validatedPalette.length) {
        const message = getInvalidPaletteMessage(paletteObj.name)
        warn(message)
        return
    }

    return {
        name: paletteObj.name,
        palette: validatedPalette
    }
}

const transformObjectShade = (paletteName: string, label: string, value: string) => {
    const isValid = CSS.supports('color', value)

    if (!isValid) {
        const message = getInvalidShadeMessage(paletteName, label, value)
        warn(message)
        return
    }

    return {
        label,
        value,
    }
}
const transformObjectColors = (paletteName: string, colorLabel: string, colorValue: ShadesType) => {
    const colorPaletteAsArray: ColorPaletteAsArray = { label: colorLabel, values: [] }
    const isString = (typeof colorValue) === 'string'

    if (isString) {
        const objectShade = transformObjectShade(paletteName, colorLabel, colorValue)
        if (!objectShade) {
            return
        }
        colorPaletteAsArray.values.push({
            label: colorLabel,
            value: colorValue,
        })

        return colorPaletteAsArray
    }

    Object.entries(colorValue).forEach(([label, value]) => {
        const objectShade = transformObjectShade(paletteName, label, value)
        if (!objectShade) {
            return
        }
        colorPaletteAsArray.values.push({
            label,
            value,
        })
    })

    return colorPaletteAsArray
};

const transformObjectPalette = (paletteObj: PaletteObj) => {
    const validatedPalette: ColorPaletteAsArray[] = []

    Object.entries(paletteObj.palette).forEach(([colorLabel, colorValues]) => {
        const objectColors = transformObjectColors(paletteObj.name, colorLabel, colorValues)
        if (!objectColors?.values?.length) {
            const message = getInvalidCollorMessage(paletteObj.name, colorLabel)
            warn(message)
            return
        }
        validatedPalette.push(objectColors)
    })

    if (!validatedPalette.length) {
        const message = getInvalidPaletteMessage(paletteObj.name)
        warn(message)
        return
    }

    return {
        name: paletteObj.name,
        palette: validatedPalette
    }
}

export const transformPalette = (paletteObj: PaletteObj) => {
    if (Array.isArray(paletteObj.palette)) {
        return validateArrayPalette(paletteObj);
    }

    return transformObjectPalette(paletteObj)
};

export const findDefaultPaletteIndex = (palettes: StatePalettes) => {
    const index = palettes.palettes.findIndex(palette => palette.name === palettes.default)

    return index;
};

export const getColorControls = (data: Story | Group, additionalApplyColorTo: string[]) => {
    const argTypes = (data.parameters as Record<string, any>)?.argTypes;
    const argTypesArray = Object.entries(argTypes);

    if (!argTypesArray.length) {
        return
    }

    const filteredArgTypes = argTypesArray.filter(arg =>
        (arg[1] as Record<string, any>).control?.type === 'color'
    );
    const colorControls = filteredArgTypes.map(arg => arg[0]);

    if (additionalApplyColorTo?.length) {
        const storyControls = argTypesArray.map(arg => arg[0]);
        const filteredAdditional = additionalApplyColorTo.filter(a =>
            storyControls.includes(a) && argTypes[a].control?.type === 'text'
        );

        const extendedControls = new Set(colorControls.concat(filteredAdditional));
        return Array.from(extendedControls);
    }

    return colorControls
}