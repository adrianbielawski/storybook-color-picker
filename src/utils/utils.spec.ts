import { PaletteObj, StatePalettes } from 'src/colorPicker/types'
import { transformPalette, findDefaultPaletteIndex } from './utils'

describe('transformPalette', () => {
	const inputAsArray: PaletteObj = {
		name: 'foo',
		palette: [
			{
				label: 'light',
				values: [
					{
						label: '100',
						value: '#fff',
					},
				],
			},
		],
	}

	const inputAsObject: PaletteObj = {
		name: 'foo',
		palette: {
			light: {
				100: '#fff',
			},
		},
	}

	const inputAsSimpleObject: PaletteObj = {
		name: 'foo',
		palette: {
			white: '#fff',
		},
	}

	const inputAsMixedObject: PaletteObj = {
		name: 'foo',
		palette: {
			...inputAsSimpleObject.palette,
			...inputAsObject.palette,
		},
	}

	const expected = [
		{
			label: 'light',
			values: [
				{
					label: '100',
					value: '#fff',
				},
			],
		},
	]

	const expectedFromSimpleObject = [
		{
			label: 'white',
			values: [
				{
					label: 'white',
					value: '#fff',
				},
			],
		},
	]

	beforeEach(() => {
		global.CSS = {
			supports: jest.fn(),
			escape: jest.fn()
		}
	})

	it.each([
		['input as array', inputAsArray, expected],
		['input as object', inputAsObject, expected],
		['input as simple object', inputAsSimpleObject, expectedFromSimpleObject],
		['input as mixed object', inputAsMixedObject, [...expectedFromSimpleObject, ...expected]],
	])('returns transformed palette correctly when %s', (desc, input, expectedPalette) => {
		(global.CSS.supports as jest.Mock).mockReturnValue(true)

		const expected = {
			name: 'foo',
			palette: expectedPalette,
		}

		const output = transformPalette(input)

		expect(output).toEqual(expected)
	})
})

describe('findDefaultPaletteIndex', () => {
	const palettes = [
		{
			name: 'palette name',
			palette: [
				{
					label: 'light',
					values: [
						{
							label: '100',
							value: '#fff',
						},
					],
				},
			],
		},
		{
			name: 'palette',
			palette: [
				{
					label: 'dark',
					values: [
						{
							label: '900',
							value: '#000',
						},
					],
				},
			],
		},
	]

	it.each([
		['name is on the list', 'palette name', 0],
		['name is on the list', 'palette', 1],
		['name is NOT on the list', 'foo', -1],
	])('return correct index when %s', (desc, defaultPalette, expected) => {
		const input = {
			default: defaultPalette,
			palettes,
		}

		const output = findDefaultPaletteIndex(input)

		expect(output).toEqual(expected)
	})
})
