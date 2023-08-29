import { StatePalettes } from 'src/colorPicker/types'

const getPrimaryPaletteName = (
  statePalettes?: StatePalettes,
  primaryPaletteIndex?: number,
) => {
  if (!statePalettes?.palettes.length) {
    return null
  }

  if (!primaryPaletteIndex) {
    return statePalettes.palettes[0].name
  }

  return statePalettes.primaryPalette
}

export default getPrimaryPaletteName
