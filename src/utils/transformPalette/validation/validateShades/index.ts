import { ShadeType } from 'src/colorPicker/types'
import validateShade from '../validateShade'

const validateShades = (shades: ShadeType[]) => {
  const validShades: ShadeType[] = []
  const invalidShades: ShadeType[] = []

  shades.forEach((shade) => {
    const isValid = validateShade(shade.value)

    if (!isValid) {
      invalidShades.push(shade)
      return
    }
    validShades.push(shade)
  })

  return {
    validShades,
    invalidShades,
  }
}

export default validateShades
