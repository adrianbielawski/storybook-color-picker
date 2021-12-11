import { ColorPaletteAsArray, PaletteObj, ShadeType } from "src/colorPicker/types";
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

    const transformValues = (label: string, value: Record<string, string> | string) => {
        const isString = (typeof value) === 'string';

        if (isString) {
            return ([
                {
                    label,
                    value: value as string,
                }
            ])
        }

        return Object.entries(value).map(value => ({
            label: value[0],
            value: value[1],
        }))
    };

    return Object.entries(paletteObj.palette).map(colors => ({
        label: colors[0],
        values: transformValues(colors[0], colors[1]),
    }))
};

export const findDefaultPaletteIndex = (palettes: PaletteObj[], name: string) => {
    const index = palettes.findIndex(palette => palette.name === name);

    if (index < 0) {
        return 0
    }

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