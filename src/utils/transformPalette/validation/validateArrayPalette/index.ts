import { ColorPaletteAsArray, PaletteAsArray } from 'src/colorPicker/types'
import { getInvalidColorMessage, getInvalidPaletteMessage, warn } from '../../messages'
import validateShade from '../validateShade'

const validateArrayPalette = (paletteObj: PaletteAsArray) => {
	const palette = paletteObj.palette as ColorPaletteAsArray[]
	const validatedPalette = palette.flatMap(p => {
		const shades = p.values.filter(v => validateShade(paletteObj.name, p.label, v.value))

		if (!shades.length) {
			const message = getInvalidColorMessage(paletteObj.name, p.label)
			warn(message)
			return []
		}

		return [{ label: p.label, values: shades }]
	})

	if (!validatedPalette.length) {
		const message = getInvalidPaletteMessage(paletteObj.name)
		warn(message)
		return
	}

	return {
		name: paletteObj.name,
		palette: validatedPalette,
	}
}

export default validateArrayPalette
