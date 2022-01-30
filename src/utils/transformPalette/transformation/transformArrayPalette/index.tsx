import { PaletteAsArray } from 'src/colorPicker/types'
import validateArrayPalette from '../../validation/validateArrayPalette'
import transformShades from '../transformShades'

const transformArrayPalette = (paletteObj: PaletteAsArray) => {
  const validatedPalette = validateArrayPalette(paletteObj)

  if (!validatedPalette) {
    return
  }

  const transformedPalette = validatedPalette.palette.map((color) => ({
    ...color,
    values: transformShades(color.values),
  }))

  return {
    name: paletteObj.name,
    palette: transformedPalette,
  }
}

export default transformArrayPalette
