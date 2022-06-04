import { State } from '@storybook/api'

export type ShadeType = {
  label: string
  value: string
}

export interface TransformedShadeType extends ShadeType {
  textColor: string
}

export type ShadesType = Record<string, string> | string

export type ColorPaletteAsObject = Record<string, ShadesType>

export type TransformedColorPalette = {
  label: string
  values: TransformedShadeType[]
}

export type ColorPaletteAsArray = {
  label: string
  values: ShadeType[]
}

export type PaletteAsObject = {
  name: string
  palette: ColorPaletteAsObject
}

export type PaletteAsArray = {
  name: string
  palette: ColorPaletteAsArray[]
}

export type PaletteObj = PaletteAsObject | PaletteAsArray

export type ColorPickerParameters = {
  primaryPalette?: string
  default?: string // Deprecated
  defaultColorPalette?: string // Deprecated
  palettes?: PaletteObj[]
  applyColorTo?: string[]
  disableDefaultPalettes?: boolean
}

export interface StatePalette {
  name: string
  palette: TransformedColorPalette[]
}

export interface InvalidColors {
  ['colorName']: ShadeType[]
}

export interface InvalidPalette {
  name: string
  invalidColors: ColorPaletteAsArray[]
}

export interface TransformedPalettes {
  palettes: StatePalette[]
  invalidPalettes: InvalidPalette[]
}

export interface StatePalettes {
  primaryPalette: string
  palettes: StatePalette[]
}

export type StoryState = {
  currentPalette: number
  controls?: string[]
  selectedControls: string[]
  copyOnClick: boolean
  storyPalettes: StatePalettes
}

export type StoryStates = Record<string, StoryState>

export interface StorybookState extends State {
  colorPalettes: StatePalettes
}

export interface AddonState {
  storyStates: StoryStates
}
