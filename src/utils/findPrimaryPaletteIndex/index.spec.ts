import { StatePalette } from 'src/colorPicker/types'
import findPrimaryPaletteIndex from '.'

describe('findPrimaryPaletteIndex', () => {
  const palettes: StatePalette[] = [
    {
      name: 'palette name',
      palette: [],
    },
    {
      name: 'palette',
      palette: [],
    },
  ]

  it.each([
    ['name is on the list', 'palette name', 0],
    ['name is on the list', 'palette', 1],
    ['name is NOT on the list', 'foo', undefined],
  ])('return correct index when %s', (_, primaryPalette, expected) => {
    const input = { primaryPalette, palettes }

    const output = findPrimaryPaletteIndex(input)

    expect(output).toEqual(expected)
  })
})
