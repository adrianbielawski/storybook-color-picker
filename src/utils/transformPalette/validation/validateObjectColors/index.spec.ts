import {
  lightArray,
  lightObject,
  paletteAsObject,
  whiteArray,
  whiteObject,
} from '../../../testsUtils'
import validateShade from '../validateShade'
import validateObjectColors from '../validateObjectColors'

jest.mock('../validateShade')

describe('validateObjectColors', () => {
  const validateShadeMock = validateShade as jest.Mock

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('calls validateShade correctly when value as string', () => {
    validateShadeMock.mockReturnValue(true)
    const color = Object.entries(whiteObject)[0]

    validateObjectColors(paletteAsObject.name, color[0], color[1])

    expect(validateShade).toHaveBeenCalledTimes(1)
    expect(validateShade).toHaveBeenCalledWith('bar', 'white', '#fff')
  })

  it('calls validateShade correctly when value as object', () => {
    validateShadeMock.mockReturnValue(true)
    const color = Object.entries(lightObject)[0]

    validateObjectColors(paletteAsObject.name, color[0], color[1])

    expect(validateShade).toHaveBeenCalledTimes(2)
    expect(validateShade).toHaveBeenNthCalledWith(1, 'bar', '100', '#fff')
    expect(validateShade).toHaveBeenNthCalledWith(2, 'bar', '200', '#eee')
  })

  it('returns transformed colors correctly when value as string', () => {
    validateShadeMock.mockReturnValue(true)
    const color = Object.entries(whiteObject)[0]

    const output = validateObjectColors(
      paletteAsObject.name,
      color[0],
      color[1]
    )

    expect(output).toEqual(whiteArray)
  })

  it('returns undefined and logs wornings when incorect value as string', () => {
    validateShadeMock.mockReturnValue(false)
    const color = Object.entries(whiteObject)[0]

    const output = validateObjectColors(
      paletteAsObject.name,
      color[0],
      color[1]
    )

    expect(output).toEqual(undefined)
  })

  it('returns transformed colors correctly when value as object', () => {
    validateShadeMock.mockReturnValue(true)
    const color = Object.entries(lightObject)[0]

    const output = validateObjectColors(
      paletteAsObject.name,
      color[0],
      color[1]
    )

    expect(validateShade).toHaveBeenCalledTimes(2)
    expect(output).toEqual(lightArray)
  })

  it('returns transformed colors correctly and logs wornings when one incorect object value', () => {
    validateShadeMock.mockReturnValueOnce(false).mockReturnValue(true)
    const color = Object.entries(lightObject)[0]
    const expected = {
      label: 'light',
      values: [
        {
          label: '200',
          value: '#eee',
        },
      ],
    }

    const output = validateObjectColors(
      paletteAsObject.name,
      color[0],
      color[1]
    )

    expect(validateShade).toHaveBeenCalledTimes(2)
    expect(output).toEqual(expected)
  })

  it('returns undefined and logs wornings when no corect object values', () => {
    validateShadeMock.mockReturnValue(false)
    const color = Object.entries(lightObject)[0]

    const output = validateObjectColors(
      paletteAsObject.name,
      color[0],
      color[1]
    )

    expect(validateShade).toHaveBeenCalledTimes(2)
    expect(output).toEqual(undefined)
  })
})
