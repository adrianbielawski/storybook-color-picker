import chroma, { ChromaStatic } from 'chroma-js'
import getTextColor from '.'

jest.mock('chroma-js', () => {
  const chromaMock = () => {
    return chromaMock.Color()
  }

  chromaMock.mockedColor = {
    luminance: jest.fn(),
    alpha: jest.fn(),
  }
  chromaMock.Color = () => chromaMock.mockedColor

  chromaMock.mix = jest.fn(() => chromaMock.Color())

  return chromaMock
})

interface ChromaMock extends ChromaStatic {
  mockedColor?: {
    luminance: jest.Mock
    alpha: jest.Mock
  }
}

describe('getTextColor', () => {
  const chromaMock = jest.mocked<ChromaMock>(chroma)
  const luminanceMock = chromaMock.mockedColor.luminance
  const alphaMock = chromaMock.mockedColor.alpha

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it.each([
    [0.6, '#000000'],
    [0.2, '#FFFFFF'],
  ])('returns text color correctly (luminance = %s)', (luminance, expected) => {
    luminanceMock.mockReturnValue(luminance)

    const output = getTextColor('foo') // Color is mocked

    expect(output).toEqual(expected)
  })

  it.each([
    [0, 1],
    [0.5, 0.25],
    [1, 0],
  ])('mixes transparent colors with white (alpha = %s)', (alpha, expected) => {
    alphaMock.mockReturnValue(alpha)

    getTextColor('foo') // Color is mocked

    expect(chroma.mix).toHaveBeenCalledWith(
      chromaMock.mockedColor,
      '#FFFFFF',
      expected
    )
  })
})
