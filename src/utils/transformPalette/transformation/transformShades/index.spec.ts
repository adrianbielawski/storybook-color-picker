import { lightArray, transformedLightArray } from 'src/utils/testsUtils'
import transformShades from '.'
import getTextColor from '../getTextColor'

jest.mock('../getTextColor')

describe('transformShades', () => {
  const getTextColorMock = jest.mocked(getTextColor)
  it('transformes shades correctly', () => {
    getTextColorMock.mockReturnValue('#000000')

    const output = transformShades(lightArray.values)

    expect(output).toEqual(transformedLightArray.values)
  })
})
