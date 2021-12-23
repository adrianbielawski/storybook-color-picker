import { getInvalidShadeMessage, warn } from '../../messages'

const validateShade = (paletteName: string, label: string, value: string) => {
	const isValid = CSS.supports('color', value)

	if (!isValid) {
		const message = getInvalidShadeMessage(paletteName, label, value)
		warn(message)
		return
	}

	return true
}

export default validateShade 