import validateShade from '../validateShade'
import validateShades from '.'

jest.mock('../validateShade')

const validateShadeMock = validateShade as jest.Mock

describe('validateShades', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    global.CSS = {
      supports: jest.fn(),
      escape: jest.fn(),
    }
  })

  it.each([
    ['all values are valid', [true, true], [2, 0]],
    ['has valid and invalid values', [true, false], [1, 1]],
    ['no valid values', [false, false], [0, 2]],
  ])(
    'Returns correct values when %s',
    (desc, isValid, [expectedValidColors, expectedInvalidColors]) => {
      validateShadeMock
        .mockReturnValueOnce(isValid[0])
        .mockReturnValueOnce(isValid[1])

      const output = validateShades([
        { label: 'foo', value: '#000' },
        { label: 'bar', value: '#FFF' },
      ])

      expect(output.validShades).toHaveLength(expectedValidColors)
      expect(output.invalidShades).toHaveLength(expectedInvalidColors)
    }
  )
})
