/* eslint-disable no-console */
import joinStringList from '../joinStringList'

export const getInvalidPaletteMessage = (
  invalidColors: string[],
  paletteName: string
) => {
  const list = joinStringList(invalidColors, 2, 'other invalid color')
  return `${list} detected in "${paletteName}" palette.`
}

export const warn = (message: string) =>
  console.warn(`%cColor picker warning%c: ${message}`, 'color: red')
