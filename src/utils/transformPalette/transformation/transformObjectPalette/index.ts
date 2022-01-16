import { PaletteAsObject } from 'src/colorPicker/types'
import { getInvalidColorMessage, getInvalidPaletteMessage, warn } from '../../messages'
import validateObjectColors from '../../validation/validateObjectColors'
import transformShades from '../transformShades'

const transformObjectPalette = (paletteObj: PaletteAsObject) => {
	const validatedPalette = Object.entries(paletteObj.palette).flatMap(
		([colorLabel, colorValues]) => {
			const colorPaletteAsArray = validateObjectColors(paletteObj.name, colorLabel, colorValues)

			if (!colorPaletteAsArray?.values?.length) {
				const message = getInvalidColorMessage(paletteObj.name, colorLabel)
				warn(message)
				return []
			}

			return [colorPaletteAsArray]
		}
	)

	if (!validatedPalette.length) {
		const message = getInvalidPaletteMessage(paletteObj.name)
		warn(message)
		return
	}

	const transformedPalette = validatedPalette.map(color => ({
		...color,
    values: transformShades(color.values)
	}))

	return {
		name: paletteObj.name,
		palette: transformedPalette,
	}
}

export default transformObjectPalette
