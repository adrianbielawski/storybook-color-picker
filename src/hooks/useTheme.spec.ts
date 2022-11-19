import useTheme, { lightTheme, commonTheme, darkTheme } from './useTheme'
import { useTheme as useSBTheme } from '@storybook/theming'
import { renderHook } from '@testing-library/react-hooks'

jest.mock('@storybook/theming')

const mockUseSBTheme = jest.mocked(useSBTheme)

describe('useTheme', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it.each([
    ['light', lightTheme],
    ['dark', darkTheme],
  ])(
    'Returns correct object when storybook theme === %s',
    (themeType, theme) => {
      mockUseSBTheme.mockReturnValue({ base: themeType })
      const { result } = renderHook(() => useTheme())

      expect(result.current).toStrictEqual({
        theme,
        commonTheme,
        themeType,
      })
    }
  )
})
