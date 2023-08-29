import { StatePalettes } from 'src/colorPicker/types'

const findPrimaryPaletteIndex = (palettes: StatePalettes) => {
  const index = palettes.palettes.findIndex(
    (palette) => palette.name === palettes.primaryPalette,
  )

  return index >= 0 ? index : undefined
}

export default findPrimaryPaletteIndex
