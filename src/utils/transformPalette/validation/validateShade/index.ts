import chroma from 'chroma-js'

const validateShade = (shade: string) => chroma.valid(shade)

export default validateShade
