import validateShade from '.'
import chroma from 'chroma-js'

jest.mock('chroma-js', () => ({
  valid: jest.fn(),
}))

const validMock = chroma.valid as jest.Mock

describe('validateShade', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it.each([
    ['true', 'valid', true, true],
    ['false', 'invalid', false, false],
  ])('returns %p if color is %s', (desc1, desc2, isValid, expected) => {
    validMock.mockReturnValue(isValid)

    const output = validateShade('baz')

    expect(output).toBe(expected)
  })
})
