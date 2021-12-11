import { State } from '@storybook/api';

export type ShadeType = {
    label: string
    value: string
}

export type ColorPaletteAsObject = Record<string, ShadesType>;

export type ColorPaletteAsArray = {
    label: string
    values: ShadeType[]
}

export type ShadesType = Record<string, string> | string
export type ColorPalette = ColorPaletteAsObject | ColorPaletteAsArray[]

export type PaletteObj = {
    name: string
    palette: ColorPalette
}

export type ColorPalettes = {
    default: string
    palettes: PaletteObj[]
}

export type AddonState =
    | {
          currentPalette: number
          applyColorTo?: string[]
      }
    | undefined

export interface StatePalette {
    name: string
    colors: ColorPaletteAsArray[]
}

export interface StatePalettes {
    default: string
    palettes: StatePalette[]
}

export interface StorybookState extends State {
    colorPalettes: StatePalettes
}
