import { ColorPaletteAsArray, PaletteObj, ShadesType, ShadeType, StatePalettes } from "src/colorPicker/types";
import { Story, Group } from "@storybook/api/dist/ts3.9/lib/stories";

const getInvalidColorMessage = (paletteName: string, colorLabel: string, shadeLabel: string) => (
    `%cInvalid color value in ${paletteName}: ${colorLabel} -> ${shadeLabel}. It has been removed from palette.`
)

const getInvalidPaletteCollorMessage = (paletteName: string, colorName: string) => (
    `%cNo valid colors in ${paletteName} -> ${colorName}. It has been removed from palette.`
)

const getInvalidPaletteMessage = (paletteName: string) => (
    `%cNo valid colors in ${paletteName}. Palette has been removed.`
)

const warn = (message: string) => console.warn(message, 'color: red')

const validateArrayPalettes = (paletteObj: PaletteObj) => {
    const palette = paletteObj.palette as ColorPaletteAsArray[]
    const validatedPalette: ColorPaletteAsArray[] = []

    palette.forEach((p, i) => {
        validatedPalette.push({ label: p.label, values: [] })
        const shades: ShadeType[] = []

        p.values.forEach((v, j) => {
            const isValid = CSS.supports('color', v.value)
            if (!isValid) {
                const message = getInvalidColorMessage(paletteObj.name, p.label, v.label)
                warn(message)
                return
            }
            shades.push(v)
        })

        if (!shades.length) {
            validatedPalette.splice(i, 1)
            const message = getInvalidPaletteCollorMessage(paletteObj.name, p.label)
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

    return validatedPalette;
}

const validatedStringValues = (paletteName: string, label: string, value: string) => {
    const isValid = CSS.supports('color', value)

    if (!isValid) {
        const message = getInvalidColorMessage(paletteName, label, value)
        warn(message)
        return
    }

    return {
        label,
        value,
    }
}

const transformObjectPalette = (paletteObj: PaletteObj) => {
    const transformValues = (colorLabel: string, colorValue: ShadesType) => {
        const colorPaletteAsArray: ColorPaletteAsArray = { label: colorLabel, values: [] }
        const isString = (typeof colorValue) === 'string'

        if (isString) {
            const validatedStringValue = validatedStringValues(paletteObj.name, colorLabel, colorValue)
            if (!validatedStringValue) {
                return
            }
            colorPaletteAsArray.values.push({
                label: colorLabel,
                value: colorValue,
            })

            return
        }

        Object.entries(colorValue).forEach(([label, value]) => {
            const validatedObjectValue = validatedStringValues(paletteObj.name, label, value)
            if (!validatedObjectValue) {
                return
            }
            colorPaletteAsArray.values.push({
                label,
                value,
            })
        })

        return colorPaletteAsArray
    };

    const validatedPalette: ColorPaletteAsArray[] = []

    Object.entries(paletteObj.palette).forEach(([colorLabel, colorValues]) => {
        const paletteColors = transformValues(colorLabel, colorValues)
        if (!paletteColors?.values?.length) {
            const message = getInvalidPaletteCollorMessage(paletteObj.name, colorLabel)
            warn(message)
            return
        }
        validatedPalette.push(paletteColors)
    })

    if (!validatedPalette.length) {
        const message = getInvalidPaletteMessage(paletteObj.name)
        warn(message)
        return
    }

    return validatedPalette
}

export const transformPalette = (paletteObj: PaletteObj) => {
    if (Array.isArray(paletteObj.palette)) {
        return validateArrayPalettes(paletteObj);
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