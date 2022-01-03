import { StatePalettes } from "src/colorPicker/types"

const getDefaultPaletteName = (statePalettes?: StatePalettes, defaultPaletteIndex?: number) => {
  if (!statePalettes?.palettes.length) {
    return null
  }

  if (!defaultPaletteIndex) {
    return statePalettes.palettes[0].name
  }
  
  return statePalettes.default
}

export default getDefaultPaletteName