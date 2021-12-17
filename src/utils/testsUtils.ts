import { PaletteObj } from "src/colorPicker/types"

export const automation = (name: string) => `[data-automation="${name}"]`

export const inputAsArray: PaletteObj = {
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