const validateShade = (shade: string) => CSS.supports('color', shade)

export default validateShade
