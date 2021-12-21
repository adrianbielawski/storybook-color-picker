import { PaletteAsArray, PaletteAsObject } from 'src/colorPicker/types'

export const automation = (name: string) => `[data-automation="${name}"]`

export const whiteArray = {
	label: 'white',
	values: [
		{
			label: 'white',
			value: '#fff',
		},
	],
}

export const lightArray = {
	label: 'light',
	values: [
		{
			label: '100',
			value: '#fff',
		},
		{
			label: '200',
			value: '#eee',
		},
	],
}

export const darkArray = {
	label: 'dark',
	values: [
		{
			label: '100',
			value: '#000',
		},
		{
			label: '200',
			value: '#111',
		},
	],
}

export const paletteAsArray: PaletteAsArray = {
	name: 'foo',
	palette: [lightArray, darkArray, whiteArray],
}

export const lightObject = {
	light: {
		100: '#fff',
		200: '#eee',
	},
}

export const darkObject = {
	dark: {
		100: '#000',
		200: '#111',
	},
}

export const whiteObject = { white: '#fff' }

export const paletteAsObject: PaletteAsObject = {
	name: 'bar',
	palette: {
		...lightObject,
		...darkObject,
		...whiteObject,
	},
}
