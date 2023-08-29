import { PaletteObj, TransformedPalettes } from 'src/colorPicker/types'
import transformPalette from '../transformPalette'
import { defaultPalettes } from '../../constants'

const getColorPalettes = (
  disableDefaultPalettes?: boolean,
  customPalettes?: PaletteObj[],
) => {
  const transformedPalettes: TransformedPalettes = {
    palettes: [],
    invalidPalettes: [],
  }

  customPalettes?.forEach((p) => {
    const transformed = transformPalette(p)

    if (transformed.palette.length) {
      transformedPalettes.palettes.push({
        name: transformed.name,
        palette: transformed.palette,
      })
    }

    if (transformed.invalidColors.length) {
      transformedPalettes.invalidPalettes.push({
        name: p.name,
        invalidColors: transformed.invalidColors,
      })
    }
  })

  if (!disableDefaultPalettes) {
    transformedPalettes.palettes.push(...defaultPalettes)
  }

  return transformedPalettes
}

export default getColorPalettes
