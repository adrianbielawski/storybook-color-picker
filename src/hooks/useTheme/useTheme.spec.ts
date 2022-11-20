import useTheme from './useTheme'
import { lightTheme, commonTheme, darkTheme } from './constants'
import { useParameter } from '@storybook/api'
import { useTheme as useSBTheme } from '@storybook/theming'
import { renderHook } from '@testing-library/react-hooks'

jest.mock('@storybook/theming')
jest.mock('@storybook/api')

const mockUseSBTheme = jest.mocked(useSBTheme)
const mockUseParameter = jest.mocked(useParameter)

describe('useTheme', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it.each([
    ['light', 'light', lightTheme, 'light'],
    ['dark', 'dark', darkTheme, 'dark'],
    ['light', 'light', lightTheme, 'light'],
    ['dark', 'light', lightTheme, 'light'],
    ['dark', 'dark', darkTheme, 'dark'],
    ['light', 'dark', darkTheme, 'dark'],
    ['dark', 'auto', darkTheme, 'dark'],
    ['light', 'auto', lightTheme, 'light'],
    ['light', undefined, lightTheme, 'light'],
    ['dark', undefined, darkTheme, 'dark'],
  ])(
    'Returns correct object when storybook SBTheme === %s, addonTheme === %s',
    (SBTheme, addonTheme, theme, expectedThemeType) => {
      mockUseSBTheme.mockReturnValue({ base: SBTheme })
      mockUseParameter.mockReturnValue({ theme: addonTheme })
      const { result } = renderHook(() => useTheme())

      expect(useSBTheme).toHaveBeenCalledTimes(1)
      expect(useParameter).toHaveBeenCalledTimes(1)
      expect(useParameter).toHaveBeenCalledWith('colorPicker')
      expect(result.current).toStrictEqual({
        theme,
        commonTheme,
        themeType: expectedThemeType,
      })
    }
  )
})
