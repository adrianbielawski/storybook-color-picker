import { Theme, ThemeVars, useTheme as useSBTheme } from '@storybook/theming'

export const lightTheme = {
  text: {
    primary: '#333333',
    hover: '#ffffff',
  },
  background: {
    primary: '#ffffff',
    secondary: '#ffffff',
    tertiary: '#eeeeee',
    hover: '#f5f5f5',
  },
  border: {
    primary: '#99999966',
  },
  shadow: {
    primary: '#eeeeee',
  },
}

export const darkTheme = {
  text: {
    primary: '#ffffff',
    hover: '#333333',
  },
  background: {
    primary: '#2f2f2f',
    secondary: '#333333',
    tertiary: '#5d5d5d',
    hover: '#1EA7FD',
  },
  border: {
    primary: '#ffffff',
  },
  shadow: {
    primary: '#6c6c6c',
  },
}

export const themes = { light: lightTheme, dark: darkTheme }

export const commonTheme = {
  border: {
    primary: '#99999966',
  },
}

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
