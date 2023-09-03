import { useParameter } from '@storybook/manager-api'
import { Theme, ThemeVars, useTheme as useSBTheme } from '@storybook/theming'
import { ColorPickerParameters } from 'src/colorPicker/types'
import { themes, commonTheme } from './constants'

interface SBTheme extends Theme {
  base: ThemeVars['base']
}

const useTheme = () => {
  const sbTheme = useSBTheme() as SBTheme
  const colorPicker = useParameter<ColorPickerParameters>('colorPicker') || {}
  let themeType = sbTheme.base

  if (colorPicker.theme && colorPicker.theme !== 'auto') {
    themeType = colorPicker.theme
  }

  return {
    theme: themes[themeType],
    commonTheme,
    themeType,
  }
}

export type ThemeData = ReturnType<typeof useTheme>

export default useTheme
