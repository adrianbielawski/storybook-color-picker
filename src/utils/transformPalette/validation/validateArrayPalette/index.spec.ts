import { darkArray, lightArray, paletteAsArray, whiteArray } from '../../../testsUtils'
import validateShade from '../validateShade'
import validateArrayPalette from '../validateArrayPalette'
import * as messages from '../..//messages'

jest.mock('../validateShade')

describe('validateArrayPalette', () => {
	let warnSpy: jest.SpyInstance

	beforeEach(() => {
		jest.resetAllMocks()
		warnSpy = jest.spyOn(messages, 'warn')
		jest.spyOn(messages, 'getInvalidColorMessage')
		jest.spyOn(messages, 'getInvalidPaletteMessage')
	})

	it.only('validates all shades', () => {
		;(validateShade as jest.Mock).mockReturnValue(true)

		validateArrayPalette(paletteAsArray)

		expect(validateShade).toHaveBeenCalledTimes(5)
		expect(validateShade).toHaveBeenNthCalledWith(1, 'foo', 'light', '#fff')
		expect(validateShade).toHaveBeenNthCalledWith(2, 'foo', 'light', '#eee')
		expect(validateShade).toHaveBeenNthCalledWith(3, 'foo', 'dark', '#000')
		expect(validateShade).toHaveBeenNthCalledWith(4, 'foo', 'dark', '#111')
		expect(validateShade).toHaveBeenNthCalledWith(5, 'foo', 'white', '#fff')
	})

	it.only('returns transformed palette correctly', () => {
		;(validateShade as jest.Mock).mockReturnValue(true)

		const expected = {
			name: 'foo',
			palette: [lightArray, darkArray, whiteArray],
		}

		const output = validateArrayPalette(paletteAsArray)

		expect(messages.warn).not.toHaveBeenCalled()
		expect(messages.getInvalidColorMessage).not.toHaveBeenCalled()
		expect(messages.getInvalidPaletteMessage).not.toHaveBeenCalled()
		expect(output).toEqual(expected)
	})

	it('returns transformed palette correctly and logs warning when invalid shade', () => {
		;(validateShade as jest.Mock).mockReturnValueOnce(false).mockReturnValue(true)

		const expected = {
			name: 'foo',
			palette: [
				{
					label: 'light',
					values: [
						{
							label: '200',
							value: '#eee',
						},
					],
				},
				darkArray,
				whiteArray,
			],
		}

		const output = validateArrayPalette(paletteAsArray)

		expect(validateShade).toHaveBeenCalledTimes(5)
		expect(messages.warn).not.toHaveBeenCalled()
		expect(messages.getInvalidColorMessage).not.toHaveBeenCalled()
		expect(messages.getInvalidPaletteMessage).not.toHaveBeenCalled()
		expect(output).toEqual(expected)
	})

	it('returns transformed palette correctly and logs warnings when invalid all color shades', () => {
		;(validateShade as jest.Mock)
			.mockReturnValueOnce(false)
			.mockReturnValueOnce(false)
			.mockReturnValue(true)

		const expected = {
			name: 'foo',
			palette: [darkArray, whiteArray],
		}

		const output = validateArrayPalette(paletteAsArray)

		expect(validateShade).toHaveBeenCalledTimes(5)
		expect(messages.warn).toHaveBeenCalledTimes(1)
		expect(messages.getInvalidColorMessage).toHaveBeenCalledTimes(1)
		expect(messages.getInvalidPaletteMessage).not.toHaveBeenCalled()
		expect(output).toEqual(expected)
	})

	it('returns undefined and logs warnings if no valid shades', () => {
		;(validateShade as jest.Mock).mockReturnValue(false)

		const output = validateArrayPalette(paletteAsArray)

		expect(validateShade).toHaveBeenCalledTimes(5)
		expect(messages.warn).toHaveBeenCalledTimes(4)
		expect(messages.getInvalidColorMessage).toHaveBeenCalledTimes(3)
		expect(messages.getInvalidPaletteMessage).toHaveBeenCalledTimes(1)
		expect(output).toBeUndefined()
	})
})
