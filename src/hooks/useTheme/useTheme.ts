import { Theme, ThemeVars, useTheme as useSBTheme } from '@storybook/theming'
import { themes, commonTheme } from './constants'

interface SBTheme extends Theme {
  base: ThemeVars['base']
}

const useTheme = () => {
  const sbTheme = useSBTheme<SBTheme>()
  const themeType = sbTheme.base

  return {
    theme: themes[themeType],
    commonTheme,
    themeType,
  }
}

export default useTheme
