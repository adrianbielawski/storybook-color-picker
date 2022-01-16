import chroma from 'chroma-js'
import { ShadeType } from 'src/colorPicker/types'
import getContrastColor from '../getContrastColor'

const getTextColor = (shade: ShadeType) => {
  const color = chroma(shade.value)
	const alpha = color.alpha()
	
	if (alpha < 1) {
		const noAlphaColor = color.alpha(1)
		const mixRatio = Math.pow(1 - alpha, 2)
		const whitted = chroma.mix(noAlphaColor, '#fff', mixRatio)
		return getContrastColor(whitted.hex())
	}
	
	return getContrastColor(color.hex())
}

export default getTextColor
