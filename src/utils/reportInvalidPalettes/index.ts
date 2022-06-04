import { InvalidPalette } from 'src/colorPicker/types'
import { getInvalidPaletteMessage, warn } from '../transformPalette/messages'

const reportInvalidPalettes = (palettes: InvalidPalette[]) => {
  palettes.forEach((palette) => {
    const invalidColors: string[] = []

    palette.invalidColors.forEach((c) => {
      c.values.forEach((s) => {
        invalidColors.push(`${c.label} -> ${s.value.toString()}`)
      })
    })

    warn(getInvalidPaletteMessage(invalidColors, palette.name))
  })
}

export default reportInvalidPalettes
