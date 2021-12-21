import { StatePalette } from "src/colorPicker/types"
import * as module from "./"


describe('findDefaultPaletteIndex', () => {
	const palettes: StatePalette[] = [
		{
			name: 'palette name',
			palette: [],
		},
		{
			name: 'palette',
			palette: [],
		},
	]

	it.each([
		['name is on the list', 'palette name', 0],
		['name is on the list', 'palette', 1],
		['name is NOT on the list', 'foo', -1],
	])('return correct index when %s', (_, defaultPalette, expected) => {
		const input = {
			default: defaultPalette,
			palettes,
		}

		const output = module.findDefaultPaletteIndex(input)

		expect(output).toEqual(expected)
	})
})