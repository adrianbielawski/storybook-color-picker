import { ColorPaletteAsArray, PaletteObj, ShadesType, ShadeType, StatePalettes } from "src/colorPicker/types";
import { Story, Group } from "@storybook/api/dist/ts3.9/lib/stories";

export const getInvalidShadeMessage = (paletteName: string, colorLabel: string, shadeLabel: string) => (
    `%cInvalid color value in ${paletteName}: ${colorLabel} -> ${shadeLabel}. It has been removed from palette.`
)

export const getInvalidColorMessage = (paletteName: string, colorName: string) => (
    `%cNo valid colors in ${paletteName} -> ${colorName}. It has been removed from palette.`
)

export const getInvalidPaletteMessage = (paletteName: string) => (
    `%cNo valid colors in ${paletteName}. Palette has been removed.`
)

export const warn = (message: string) => console.warn(message, 'color: red')

export const validateShade = (paletteName: string, label: string, value: string) => {
    const isValid = CSS.supports('color', value)

    if (!isValid) {
        const message = exports.getInvalidShadeMessage(paletteName, label, value)
        exports.warn(message)
        return
    }

    return true
}

export const validateArrayPalette = (paletteObj: PaletteObj) => {
    const palette = paletteObj.palette as ColorPaletteAsArray[]
    const validatedPalette: ColorPaletteAsArray[] = []
    let removedColors = 0
    
    palette.forEach((p, i) => {
        const index = i - removedColors
        validatedPalette.push({ label: p.label, values: [] })
        const shades: ShadeType[] = []

        p.values.forEach(v => {
            const isValid = exports.validateShade(paletteObj.name, p.label, v.label)
            if (isValid) {
                shades.push(v)
            }
        })

        if (!shades.length) {
            validatedPalette.splice(index, 1)
            removedColors++
            const message = exports.getInvalidColorMessage(paletteObj.name, p.label)
            exports.warn(message)
            return
        }
        
        validatedPalette[index].values = shades
    })

    if (!validatedPalette.length) {
        const message = exports.getInvalidPaletteMessage(paletteObj.name)
        exports.warn(message)
        return
    }

    return {
        name: paletteObj.name,
        palette: validatedPalette
    }
}

export const transformObjectColors = (paletteName: string, colorLabel: string, colorValue: ShadesType) => {
    const colorPaletteAsArray: ColorPaletteAsArray = { label: colorLabel, values: [] }
    const isString = (typeof colorValue) === 'string'

    if (isString) {
        const isValid = exports.validateShade(paletteName, colorLabel, colorValue)
        if (!isValid) {
            return
        }
        colorPaletteAsArray.values.push({
            label: colorLabel,
            value: colorValue,
        })

        return colorPaletteAsArray
    }

    Object.entries(colorValue).forEach(([label, value]) => {
        const isValid = exports.validateShade(paletteName, label, value)
        if (!isValid) {
            return
        }
        colorPaletteAsArray.values.push({
            label,
            value,
        })
    })

    if (!colorPaletteAsArray.values.length) {
        return
    }

    return colorPaletteAsArray
};

export const transformObjectPalette = (paletteObj: PaletteObj) => {
    const validatedPalette: ColorPaletteAsArray[] = []

    Object.entries(paletteObj.palette).forEach(([colorLabel, colorValues]) => {
        const colorPaletteAsArray = exports.transformObjectColors(paletteObj.name, colorLabel, colorValues)
        if (!colorPaletteAsArray?.values?.length) {
            const message = exports.getInvalidColorMessage(paletteObj.name, colorLabel)
            warn(message)
            return
        }
        validatedPalette.push(colorPaletteAsArray)
    })

    if (!validatedPalette.length) {
        const message = exports.getInvalidPaletteMessage(paletteObj.name)
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
        return exports.validateArrayPalette(paletteObj);
    }

    return exports.transformObjectPalette(paletteObj)
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