import {
  ColorPaletteAsArray,
  PaletteAsObject,
  TransformedColorPalette,
} from 'src/colorPicker/types'
import validateObjectColors from '../../validation/validateObjectColors'
import transformShades from '../transformShades'

const transformObjectPalette = (paletteObj: PaletteAsObject) => {
  const validatedPalette = Object.entries(paletteObj.palette).map(
    ([colorLabel, colorValues]) =>
      validateObjectColors(colorLabel, colorValues),
  )

  const invalidColors: ColorPaletteAsArray[] = validatedPalette.flatMap(
    (p) => p.invalidColors || [],
  )

  const transformedPalette: TransformedColorPalette[] =
    validatedPalette.flatMap((color) => {
      if (!color.palette?.values.length) {
        return []
      }

      return {
        label: color.palette.label,
        values: transformShades(color.palette.values),
      }
    })

  return {
    name: paletteObj.name,
    palette: transformedPalette,
    invalidColors,
  }
}

export default transformObjectPalette
