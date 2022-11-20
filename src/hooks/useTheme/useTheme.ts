import { useParameter } from '@storybook/api'
import { Theme, ThemeVars, useTheme as useSBTheme } from '@storybook/theming'
import { ColorPickerParameters } from 'src/colorPicker/types'
import { themes, commonTheme } from './constants'

interface SBTheme extends Theme {
  base: ThemeVars['base']
}

const useTheme = () => {
  const sbTheme = useSBTheme<SBTheme>()
  const colorPicker = useParameter<ColorPickerParameters>('colorPicker') || {}
  let themeType = sbTheme.base

  if (colorPicker.theme) {
    themeType = colorPicker.theme === 'auto' ? sbTheme.base : colorPicker.theme
  }

  return {
    theme: themes[themeType],
    commonTheme,
    themeType,
  }
}

export type ThemeData = ReturnType<typeof useTheme>

export default useTheme
