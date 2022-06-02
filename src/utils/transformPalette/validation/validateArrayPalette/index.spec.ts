import {
  darkArray,
  lightArray,
  paletteAsArray,
  whiteArray,
} from '../../../testsUtils'
import validateShade from '../validateShade'
import validateArrayPalette from '../validateArrayPalette'
import { InvalidColors, StatePalette } from 'src/colorPicker/types'

jest.mock('../validateShade')

describe('validateArrayPalette', () => {
  const validateShadeMock = validateShade as jest.Mock

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('validates all shades', () => {
    validateShadeMock.mockReturnValue(true)

    validateArrayPalette(paletteAsArray)

    expect(validateShade).toHaveBeenCalledTimes(5)
    expect(validateShade).toHaveBeenNthCalledWith(1, '#fff')
    expect(validateShade).toHaveBeenNthCalledWith(2, '#eee')
    expect(validateShade).toHaveBeenNthCalledWith(3, '#000')
    expect(validateShade).toHaveBeenNthCalledWith(4, '#111')
    expect(validateShade).toHaveBeenNthCalledWith(5, '#fff')
  })

  it('gets invalid messages and calls warn', () => {
    validateShadeMock.mockReturnValue(false)

    validateArrayPalette(paletteAsArray)
  })

  it('returns transformed palette correctly', () => {
    validateShadeMock.mockReturnValue(true)

    const expected = {
      name: 'foo',
      palette: [lightArray, darkArray, whiteArray],
      invalidColors: [] as InvalidColors[],
    }

    const output = validateArrayPalette(paletteAsArray)

    expect(output).toEqual(expected)
  })

  it('returns transformed palette correctly when invalid shade', () => {
    validateShadeMock.mockReturnValueOnce(false).mockReturnValue(true)

    const output = validateArrayPalette(paletteAsArray)

    const expected = {
      name: 'foo',
      palette: [
        {
          label: 'light',
          values: [
            {
              label: '200',
              value: '#eee',
            },
          ],
        },
        darkArray,
        whiteArray,
      ],
      invalidColors: [
        {
          label: paletteAsArray.palette[0].label,
          values: [paletteAsArray.palette[0].values[0]],
        },
      ],
    }

    expect(output).toEqual(expected)
  })

  it('returns transformed palette correctly when invalid all color shades', () => {
    validateShadeMock
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValue(true)

    const output = validateArrayPalette(paletteAsArray)

    const expected = {
      name: 'foo',
      palette: [darkArray, whiteArray],
      invalidColors: [lightArray],
    }

    expect(output).toEqual(expected)
  })

  it('returns no palettes whe no valid shades', () => {
    validateShadeMock.mockReturnValue(false)

    const output = validateArrayPalette(paletteAsArray)

    const expected = {
      name: 'foo',
      palette: [] as StatePalette[],
      invalidColors: [lightArray, darkArray, whiteArray],
    }

    expect(output).toEqual(expected)
  })
})
