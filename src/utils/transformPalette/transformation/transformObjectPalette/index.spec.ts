import {
  darkArray,
  lightArray,
  paletteAsObject,
  transformedDarkArray,
  transformedLightArray,
  transformedWhiteArray,
  whiteArray,
} from '../../../testsUtils'
import transformObjectPalette from './'
import validateObjectColors from '../../validation/validateObjectColors'
import * as messages from '../../messages'

jest.mock('../../validation/validateObjectColors')

describe('transformObjectPalette', () => {
  const validateObjectColorsMock = validateObjectColors as jest.Mock
  beforeEach(() => {
    jest.resetAllMocks()
    jest.spyOn(messages, 'getInvalidColorMessage')
    jest.spyOn(messages, 'getInvalidPaletteMessage')
  })

  it('returns transformed palette corectly', () => {
    validateObjectColorsMock
      .mockReturnValueOnce(lightArray)
      .mockReturnValueOnce(darkArray)
      .mockReturnValueOnce(whiteArray)
    const output = transformObjectPalette(paletteAsObject)

    const expected = {
      name: 'bar',
      palette: [
        transformedLightArray,
        transformedDarkArray,
        transformedWhiteArray,
      ],
    }

    expect(validateObjectColors).toHaveBeenCalledTimes(3)
    expect(messages.getInvalidColorMessage).not.toHaveBeenCalled()
    expect(messages.getInvalidPaletteMessage).not.toHaveBeenCalled()
    expect(output).toEqual(expected)
  })

  it('returns transformed palette corectly when values of one color are invalid', () => {
    validateObjectColorsMock
      .mockReturnValueOnce(undefined)
      .mockReturnValueOnce(darkArray)
      .mockReturnValueOnce(whiteArray)

    const output = transformObjectPalette(paletteAsObject)

    const expected = {
      name: 'bar',
      palette: [transformedDarkArray, transformedWhiteArray],
    }

    expect(validateObjectColors).toHaveBeenCalledTimes(3)
    expect(messages.getInvalidColorMessage).toHaveBeenCalledTimes(1)
    expect(messages.getInvalidPaletteMessage).not.toHaveBeenCalled()
    expect(output).toEqual(expected)
  })

  it('returns undefined when values of all colors are invalid', () => {
    validateObjectColorsMock.mockReturnValue(undefined)

    const output = transformObjectPalette(paletteAsObject)

    expect(validateObjectColors).toHaveBeenCalledTimes(3)
    expect(messages.getInvalidColorMessage).toHaveBeenCalledTimes(3)
    expect(messages.getInvalidPaletteMessage).toHaveBeenCalledTimes(1)
    expect(output).toEqual(undefined)
  })
})
