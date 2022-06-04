import validateShade from '.'

describe('validateShade', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    global.CSS = {
      supports: jest.fn(),
      escape: jest.fn(),
    }
  })

  it.each([
    ['true', 'valid', true, true],
    ['false', 'invalid', false, false],
  ])('returns %p if color is %s', (desc1, desc2, isValid, expected) => {
    const CSSSupports = global.CSS.supports as jest.Mock
    CSSSupports.mockReturnValue(isValid)

    const output = validateShade('baz')

    expect(output).toBe(expected)
  })
})
