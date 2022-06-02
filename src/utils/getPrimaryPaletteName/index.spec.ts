import { StatePalettes } from 'src/colorPicker/types'
import getPrimaryPaletteName from '.'

describe('getPrimaryPaletteName', () => {
  const palettes: StatePalettes = {
    primaryPalette: 'bar',
    palettes: [
      {
        name: 'foo',
        palette: [],
      },
      {
        name: 'bar',
        palette: [],
      },
    ],
    invalidPalettes: [],
  }

  it.each([
    ['null when no statePalettes', undefined, undefined, null],
    [
      'first palette name when no primaryPaletteIndex',
      palettes,
      undefined,
      'foo',
    ],
    ['primary palette name', palettes, 2, 'bar'],
  ])('returns %s', (_, statePalettes, primaryPaletteIndex, expected) => {
    const output = getPrimaryPaletteName(statePalettes, primaryPaletteIndex)

    expect(output).toEqual(expected)
  })
})
