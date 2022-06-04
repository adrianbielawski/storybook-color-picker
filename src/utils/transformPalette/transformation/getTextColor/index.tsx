import chroma from 'chroma-js'

const getTextColor = (color: string) => {
  const chromaColor = chroma(color)
  const alpha = chromaColor.alpha()
  const mixRatio = Math.pow(1 - alpha, 2)
  const whitened = chroma.mix(chromaColor, '#FFFFFF', mixRatio)
  const luminanceThreshold = 0.45

  return whitened.luminance() > luminanceThreshold ? '#000000' : '#FFFFFF'
}

export default getTextColor
