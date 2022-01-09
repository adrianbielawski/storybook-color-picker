import { PaletteAsArray, StatePalettes } from 'src/colorPicker/types'
import getColorPalettes from './'
import { defaultPalettes } from '../../constants'
import transformPalette from '../transformPalette'

jest.mock('../transformPalette')

describe('getColorPalettes', () => {
	const paletteAsArray: PaletteAsArray = {
		name: 'foo',
		palette: [
			{
				label: 'white',
				values: [
					{
						label: 'white',
						value: '#fff',
					},
				],
			},
		],
	}

	const transformPaletteMock = transformPalette as jest.Mock

	beforeEach(() => {
		jest.resetAllMocks()
	})

	it.each([
		[
			'default and custom palettes',
			undefined,
			[paletteAsArray],
			[paletteAsArray, ...defaultPalettes],
		],
		[
			'only default palettes when no custom palettes',
			undefined,
			undefined,
			[...defaultPalettes],
		],
		[
			'only custom palettes when disableDefaultPalettes === true',
			true,
			[paletteAsArray],
			[paletteAsArray],
		],
	])('returns %s', (_, disableDefaultPalettes, customPalette, expectedPalettes) => {
		transformPaletteMock.mockReturnValue(paletteAsArray)
		const expected: StatePalettes = {
			primaryPalette: 'foo',
			palettes: expectedPalettes,
		}

		const output = getColorPalettes('foo', disableDefaultPalettes, customPalette)

		if (customPalette) {
			expect(transformPaletteMock).toBeCalledTimes(1)
			expect(transformPaletteMock).toBeCalledWith(paletteAsArray)
		} else {
			expect(transformPaletteMock).toBeCalledTimes(0)
		}
		expect(output).toEqual(expected)
	})
})
