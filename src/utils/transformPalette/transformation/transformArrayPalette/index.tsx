import { PaletteAsArray, TransformedColorPalette } from 'src/colorPicker/types'
import validateArrayPalette from '../../validation/validateArrayPalette'
import transformShades from '../transformShades'

const transformArrayPalette = (paletteObj: PaletteAsArray) => {
  const validatedPalette = validateArrayPalette(paletteObj)

  const transformedPalette: TransformedColorPalette[] = validatedPalette.palette.map((color) => ({
    ...color,
    values: transformShades(color.values),
  }))

  return {
    name: paletteObj.name,
    palette: transformedPalette,
    invalidColors: validatedPalette.invalidColors,
  }
}

export default transformArrayPalette
