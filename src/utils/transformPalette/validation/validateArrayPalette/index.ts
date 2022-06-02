import { ColorPaletteAsArray, PaletteAsArray } from 'src/colorPicker/types'
import validateShades from '../validateShades'

const validateArrayPalette = (paletteObj: PaletteAsArray) => {
  const palette = paletteObj.palette as ColorPaletteAsArray[]
  const invalidColors = [] as ColorPaletteAsArray[]

  const validatedPalette: ColorPaletteAsArray[] = palette.flatMap((p) => {
    const shades = validateShades(p.values)

    if (shades.invalidShades.length) {
      invalidColors.push({ label: p.label, values: shades.invalidShades })
    }

    if (!shades.validShades.length) {
      return []
    }

    return { label: p.label, values: shades.validShades }
  })

  return {
    name: paletteObj.name,
    palette: validatedPalette,
    invalidColors,
  }
}

export default validateArrayPalette
