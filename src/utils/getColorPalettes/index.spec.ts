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
			'foo',
			undefined,
			[paletteAsArray],
			[paletteAsArray, ...defaultPalettes],
		],
		[
			'only default palettes when no custom palettes',
			'foo',
			undefined,
			undefined,
			[...defaultPalettes],
		],
		[
			'only custom palettes when disableDefaultPalettes === true',
			'foo',
			true,
			[paletteAsArray],
			[paletteAsArray],
		],
	])('returns %s', (_, defaultPalette, disableDefaultPalettes, customPalette, expectedPalettes) => {
		transformPaletteMock.mockReturnValue(paletteAsArray)
		const expected: StatePalettes = {
			default: defaultPalette,
			palettes: expectedPalettes,
		}

		const output = getColorPalettes(defaultPalette, disableDefaultPalettes, customPalette)

		if (customPalette) {
			expect(transformPaletteMock).toBeCalledTimes(1)
			expect(transformPaletteMock).toBeCalledWith(paletteAsArray)
		} else {
			expect(transformPaletteMock).toBeCalledTimes(0)
		}
		expect(output).toEqual(expected)
	})
})
