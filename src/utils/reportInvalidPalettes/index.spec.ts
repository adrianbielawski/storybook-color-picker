import reportInvalidPalettes from '.'
import { invalidPaletteAsArray } from '../testsUtils'
import { getInvalidPaletteMessage, warn } from '../transformPalette/messages'

jest.mock('../transformPalette/messages')

const getInvalidPaletteMessageMock = getInvalidPaletteMessage as jest.Mock
const warnMock = warn as jest.Mock

describe('reportInvalidPalettes', () => {
  getInvalidPaletteMessageMock.mockReturnValue('expected string')

  it('reports correctly', () => {
    reportInvalidPalettes(invalidPaletteAsArray)

    const expectedInvalidColors = ['light -> #fff', 'light -> #eee']

    expect(getInvalidPaletteMessageMock).toBeCalledTimes(1)
    expect(getInvalidPaletteMessageMock).toBeCalledWith(
      expectedInvalidColors,
      'foo'
    )
    expect(warnMock).toBeCalledTimes(1)
    expect(warnMock).toBeCalledWith('expected string')
  })
})
