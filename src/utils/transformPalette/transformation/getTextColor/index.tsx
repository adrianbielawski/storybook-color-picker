import chroma from 'chroma-js'

const getTextColor = (color: string) => {
	const chromaColor = chroma(color)
	const alpha = chromaColor.alpha()
	const noAlphaColor = chromaColor.alpha(1)
	const mixRatio = Math.pow(1 - alpha, 2)
	const whitened = chroma.mix(noAlphaColor, '#fff', mixRatio)
	
	const luminanceTreshold = 0.450

	return whitened.luminance() > luminanceTreshold ? '#000' : '#fff'
}

export default getTextColor
