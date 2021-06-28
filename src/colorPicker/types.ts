export type ShadeType = {
    label: string,
    value: string,
}

export type ColorPaletteAsArray = {
    label: string,
    values: ShadeType[]
}

export type ShadesType = Record<string, string> | string;
export type ColorPalette = Record<string, ShadesType> | ColorPaletteAsArray[];

export type PaletteObj = {
    name: string,
    palette: ColorPalette,
}

export type ColorPalettes = {
    default: number,
    palettes: PaletteObj[]
}