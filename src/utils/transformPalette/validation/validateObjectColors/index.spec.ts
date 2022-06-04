import {
  lightArray,
  lightObject,
  whiteArray,
  whiteObject,
} from '../../../testsUtils'
import validateShade from '../validateShade'
import validateObjectColors from '.'

jest.mock('../validateShade')

describe('validateObjectColors', () => {
  const validateShadeMock = validateShade as jest.Mock

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('calls validateShade correctly when value as string', () => {
    validateShadeMock.mockReturnValue(true)
    const color = Object.entries(whiteObject)[0]

    validateObjectColors(color[0], color[1])

    expect(validateShade).toHaveBeenCalledTimes(1)
    expect(validateShade).toHaveBeenCalledWith('#fff')
  })

  it('calls validateShade correctly when value as object', () => {
    validateShadeMock.mockReturnValue(true)
    const color = Object.entries(lightObject)[0]

    validateObjectColors(color[0], color[1])

    expect(validateShade).toHaveBeenCalledTimes(2)
    expect(validateShade).toHaveBeenNthCalledWith(1, '#fff')
    expect(validateShade).toHaveBeenNthCalledWith(2, '#eee')
  })

  it('returns transformed colors correctly when value as string', () => {
    validateShadeMock.mockReturnValue(true)
    const color = Object.entries(whiteObject)[0]

    const output = validateObjectColors(color[0], color[1])

    const expected = {
      palette: whiteArray,
    }

    expect(output).toEqual(expected)
  })

  it('returns incorrect color when incorrect value as string', () => {
    validateShadeMock.mockReturnValue(false)
    const color = Object.entries(whiteObject)[0]

    const output = validateObjectColors(color[0], color[1])

    const expected = {
      invalidColors: whiteArray,
    }

    expect(output).toEqual(expected)
  })

  it('returns transformed colors correctly when value as object', () => {
    validateShadeMock.mockReturnValue(true)
    const color = Object.entries(lightObject)[0]

    const output = validateObjectColors(color[0], color[1])

    const expected = {
      palette: lightArray,
    }

    expect(validateShade).toHaveBeenCalledTimes(2)
    expect(output).toEqual(expected)
  })

  it('returns transformed colors correctly when one incorrect object value', () => {
    validateShadeMock.mockReturnValueOnce(false).mockReturnValue(true)
    const color = Object.entries(lightObject)[0]
    const expected = {
      palette: {
        label: 'light',
        values: [
          {
            label: '200',
            value: '#eee',
          },
        ],
      },
      invalidColors: {
        label: 'light',
        values: [
          {
            label: '100',
            value: '#fff',
          },
        ],
      },
    }

    const output = validateObjectColors(color[0], color[1])

    expect(validateShade).toHaveBeenCalledTimes(2)
    expect(output).toEqual(expected)
  })

  it('returns only incorrect colors when no correct object values', () => {
    validateShadeMock.mockReturnValue(false)
    const color = Object.entries(lightObject)[0]

    const output = validateObjectColors(color[0], color[1])

    const expected = {
      invalidColors: lightArray,
    }

    expect(validateShade).toHaveBeenCalledTimes(2)
    expect(output).toEqual(expected)
  })
})
