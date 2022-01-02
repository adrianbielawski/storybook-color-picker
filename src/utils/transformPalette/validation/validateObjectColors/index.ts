import { ColorPaletteAsArray, ShadesType } from "src/colorPicker/types"
import validateShade from "../validateShade";

const validateObjectColors = (
	paletteName: string,
	colorLabel: string,
	colorValue: ShadesType,
) => {
	const colorPaletteAsArray: ColorPaletteAsArray = { label: colorLabel, values: [] }
	const isString = (typeof colorValue) === 'string'

	if (isString) {
		const isValid = validateShade(paletteName, colorLabel, colorValue as string)
		if (!isValid) {
			return
		}
		colorPaletteAsArray.values.push({
			label: colorLabel,
			value: colorValue as string,
		})

		return colorPaletteAsArray
	}

	Object.entries(colorValue).forEach(([label, value]) => {
		const isValid = validateShade(paletteName, label, value)
		if (!isValid) {
			return
		}
		colorPaletteAsArray.values.push({
			label,
			value,
		})
	})

	if (!colorPaletteAsArray.values.length) {
		return
	}

	return colorPaletteAsArray
};

export default validateObjectColors