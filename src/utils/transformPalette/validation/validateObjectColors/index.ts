import { ColorPaletteAsArray, ShadesType } from 'src/colorPicker/types'
import validateShade from '../validateShade'

const validateObjectColors = (colorLabel: string, colorValue: ShadesType) => {
  const palette: ColorPaletteAsArray = {
    label: colorLabel,
    values: [],
  }

  const invalidColors: ColorPaletteAsArray = {
    label: colorLabel,
    values: [],
  }

  if (typeof colorValue === 'string') {
    const isValid = validateShade(colorValue as string)

    const shade = {
      label: colorLabel,
      value: colorValue as string,
    }

    if (isValid) {
      palette.values.push(shade)
    } else {
      invalidColors.values.push(shade)
    }

    return {
      palette: palette.values.length ? palette : undefined,
      invalidColors: invalidColors.values.length ? invalidColors : undefined,
    }
  }

  Object.entries(colorValue).forEach(([label, value]) => {
    const isValid = validateShade(value)
    if (!isValid) {
      invalidColors.values.push({ label, value })
      return
    }
    palette.values.push({
      label,
      value,
    })
  })

  return {
    palette: palette.values.length ? palette : undefined,
    invalidColors: invalidColors.values.length ? invalidColors : undefined,
  }
}

export default validateObjectColors
