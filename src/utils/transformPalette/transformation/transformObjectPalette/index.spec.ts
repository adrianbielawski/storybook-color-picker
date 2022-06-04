import {
  darkArray,
  lightArray,
  paletteAsArray,
  paletteAsObject,
  transformedDarkArray,
  transformedLightArray,
  transformedWhiteArray,
  whiteArray,
} from 'src/utils/testsUtils'
import transformObjectPalette from '.'
import validateObjectColors from '../../validation/validateObjectColors'
import { ColorPaletteAsArray } from 'src/colorPicker/types'

jest.mock('../../validation/validateObjectColors')

describe('transformObjectPalette', () => {
  const validateObjectColorsMock = validateObjectColors as jest.Mock
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('returns transformed palette correctly', () => {
    validateObjectColorsMock
      .mockReturnValueOnce({ palette: lightArray })
      .mockReturnValueOnce({ palette: darkArray })
      .mockReturnValueOnce({ palette: whiteArray })
    const output = transformObjectPalette(paletteAsObject)

    const expected = {
      name: 'bar',
      palette: [
        transformedLightArray,
        transformedDarkArray,
        transformedWhiteArray,
      ],
      invalidColors: [] as ColorPaletteAsArray[],
    }

    expect(validateObjectColors).toHaveBeenCalledTimes(3)
    expect(output).toEqual(expected)
  })

  it('returns transformed palette correctly when values of one color are invalid', () => {
    validateObjectColorsMock
      .mockReturnValueOnce({
        invalidColors: lightArray,
      })
      .mockReturnValueOnce({ palette: darkArray })
      .mockReturnValueOnce({ palette: whiteArray })

    const output = transformObjectPalette(paletteAsObject)

    const expected = {
      name: 'bar',
      palette: [transformedDarkArray, transformedWhiteArray],
      invalidColors: [lightArray],
    }

    expect(validateObjectColors).toHaveBeenCalledTimes(3)
    expect(output).toEqual(expected)
  })

  it('returns correctly when values of all colors are invalid', () => {
    validateObjectColorsMock
      .mockReturnValueOnce({ invalidColors: lightArray })
      .mockReturnValueOnce({ invalidColors: darkArray })
      .mockReturnValueOnce({ invalidColors: whiteArray })

    const output = transformObjectPalette(paletteAsObject)

    expect(validateObjectColors).toHaveBeenCalledTimes(3)
    expect(output).toEqual({
      name: 'bar',
      palette: [],
      invalidColors: paletteAsArray.palette,
    })
  })
})
