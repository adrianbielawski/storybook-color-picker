import { PaletteObj } from 'src/colorPicker/types'

export const automation = (name: string) => `[data-automation="${name}"]`

export const paletteAsArray: PaletteObj = {
	name: 'foo',
	palette: [
		{
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
		},
		{
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
		},
	],
}

export const paletteAsObject: PaletteObj = {
	name: 'foo',
	palette: {
		white: '#fff',
		light: {
			100: '#fff',
			200: '#eee',
		},
		dark: {
			100: '#000',
			200: '#111',
		},
	},
}
