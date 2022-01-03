import { StatePalettes } from 'src/colorPicker/types'
import getDefaultPaletteName from './'

describe('getDefaultPaletteName', () => {
	const palettes: StatePalettes = {
		default: 'bar',
		palettes: [
			{
				name: 'foo',
				palette: [],
			},
			{
				name: 'bar',
				palette: [],
			},
		],
	}

	it.each([
		['null when no statePalettes', undefined, undefined, null],
		['first palette name when no defaultPaletteIndex', palettes, undefined, 'foo'],
		['default palette name', palettes, 2, 'bar'],
	])('returns %s', (_, statePalettes, defaultPaletteIndex, expected) => {
		const output = getDefaultPaletteName(statePalettes, defaultPaletteIndex)

		expect(output).toEqual(expected)
	})
})
