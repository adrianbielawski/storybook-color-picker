import {
  darkArray,
  lightArray,
  paletteAsArray,
  statePalette,
  transformedLightArray,
  transformedDarkArray,
  transformedWhiteArray,
  whiteArray,
} from 'src/utils/testsUtils'
import transformArrayPalette from '.'
import validateArrayPalette from '../../validation/validateArrayPalette'
import transformShades from '../transformShades'

jest.mock('../../validation/validateArrayPalette')
jest.mock('../transformShades')

describe('transformArrayPalette', () => {
  const validateArrayPaletteMock = validateArrayPalette as jest.Mock
  const transformShadesMock = transformShades as jest.Mock

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('returns transformed palette correctly', () => {
    validateArrayPaletteMock.mockReturnValue(paletteAsArray)
    transformShadesMock
      .mockReturnValueOnce(transformedLightArray.values)
      .mockReturnValueOnce(transformedDarkArray.values)
      .mockReturnValueOnce(transformedWhiteArray.values)

    const output = transformArrayPalette(paletteAsArray)

    expect(validateArrayPaletteMock).toBeCalledTimes(1)
    expect(validateArrayPaletteMock).toBeCalledWith(paletteAsArray)

    expect(transformShadesMock).toHaveBeenNthCalledWith(1, lightArray.values)
    expect(transformShadesMock).toHaveBeenNthCalledWith(2, darkArray.values)
    expect(transformShadesMock).toHaveBeenNthCalledWith(3, whiteArray.values)

    expect(output).toEqual(statePalette)
  })

  it('returns empty palette array when no valid colors', () => {
    validateArrayPaletteMock.mockReturnValue({
      name: 'foo',
      palette: [],
      invalidColors: [],
    })

    const output = transformArrayPalette(paletteAsArray)

    expect(validateArrayPaletteMock).toBeCalledTimes(1)
    expect(validateArrayPaletteMock).toBeCalledWith(paletteAsArray)

    expect(transformShadesMock).not.toBeCalled()

    expect(output).toEqual({
      name: 'foo',
      palette: [],
      invalidColors: [],
    })
  })
})
