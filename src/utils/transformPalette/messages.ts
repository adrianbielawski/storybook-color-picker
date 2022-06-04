/* eslint-disable no-console */
import joinStringList from '../joinStringList'

export const getInvalidPaletteMessage = (
  invalidColors: string[],
  paletteName: string
) => {
  const count = invalidColors.length
  const x = count === 1 ? 'color' : 'colors'
  const list = joinStringList(invalidColors, 2)
  return `${list} invalid ${x} detected in "${paletteName}" palette.`
}

export const warn = (message: string) =>
  console.warn(`%cColor picker warning%c: ${message}`, 'color: red')
