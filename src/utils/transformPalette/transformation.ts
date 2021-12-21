import { ColorPaletteAsArray, PaletteAsArray, PaletteAsObject, ShadesType } from "src/colorPicker/types"
import { getInvalidColorMessage, getInvalidPaletteMessage, warn } from "./messages"
import { validateShade } from "./validation"

export const validateArrayPalette = (paletteObj: PaletteAsArray) => {
	const palette = paletteObj.palette as ColorPaletteAsArray[]
	const validatedPalette = palette.flatMap(p => {
		const shades = p.values.filter(
			v => validateShade(paletteObj.name, p.label, v.label)
		)

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
		palette: validatedPalette
	}
}

export const transformObjectColors = (
	paletteName: string,
	colorLabel: string,
	colorValue: ShadesType,
) => {
	const colorPaletteAsArray: ColorPaletteAsArray = { label: colorLabel, values: [] }
	const isString = (typeof colorValue) === 'string'

	if (isString) {
		const isValid = validateShade(paletteName, colorLabel, colorValue)
		if (!isValid) {
			return
		}
		colorPaletteAsArray.values.push({
			label: colorLabel,
			value: colorValue,
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

export const transformObjectPalette = (paletteObj: PaletteAsObject) => {
	const validatedPalette = Object.entries(paletteObj.palette).flatMap(
		([colorLabel, colorValues]) => {
			const colorPaletteAsArray = transformObjectColors(
				paletteObj.name,
				colorLabel,
				colorValues
			)

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

	return {
		name: paletteObj.name,
		palette: validatedPalette
	}
}