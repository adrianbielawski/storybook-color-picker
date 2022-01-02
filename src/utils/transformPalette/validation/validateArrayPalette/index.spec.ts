import { darkArray, lightArray, paletteAsArray, whiteArray } from '../../../testsUtils'
import validateShade from '../validateShade'
import validateArrayPalette from '../validateArrayPalette'
import * as messages from '../../messages'

jest.mock('../validateShade')

describe('validateArrayPalette', () => {
	let warnSpy: jest.SpyInstance
	let getInvalidColorMessageSpy: jest.SpyInstance
	let getInvalidPaletteMessageSpy: jest.SpyInstance


	beforeEach(() => {
		jest.resetAllMocks()
		warnSpy = jest.spyOn(messages, 'warn')
		getInvalidColorMessageSpy = jest.spyOn(messages, 'getInvalidColorMessage')
		getInvalidPaletteMessageSpy = jest.spyOn(messages, 'getInvalidPaletteMessage')
	})

	it('validates all shades', () => {
		;(validateShade as jest.Mock).mockReturnValue(true)

		validateArrayPalette(paletteAsArray)

		expect(validateShade).toHaveBeenCalledTimes(5)
		expect(validateShade).toHaveBeenNthCalledWith(1, 'foo', 'light', '#fff')
		expect(validateShade).toHaveBeenNthCalledWith(2, 'foo', 'light', '#eee')
		expect(validateShade).toHaveBeenNthCalledWith(3, 'foo', 'dark', '#000')
		expect(validateShade).toHaveBeenNthCalledWith(4, 'foo', 'dark', '#111')
		expect(validateShade).toHaveBeenNthCalledWith(5, 'foo', 'white', '#fff')
	})

	it.only('gets invalid messages and calls warn', () => {
		;(validateShade as jest.Mock).mockReturnValue(false)

		validateArrayPalette(paletteAsArray)

		expect(getInvalidColorMessageSpy).toHaveBeenCalledTimes(3)
		expect(getInvalidColorMessageSpy).toHaveBeenNthCalledWith(1, 'foo', 'light')
		expect(getInvalidColorMessageSpy).toHaveBeenNthCalledWith(2, 'foo', 'dark')
		expect(getInvalidColorMessageSpy).toHaveBeenNthCalledWith(3, 'foo', 'white')
		expect(getInvalidPaletteMessageSpy).toHaveBeenCalledTimes(1)
		expect(getInvalidPaletteMessageSpy).toHaveBeenCalledWith('foo')
	})

	it('returns transformed palette correctly', () => {
		;(validateShade as jest.Mock).mockReturnValue(true)

		const expected = {
			name: 'foo',
			palette: [lightArray, darkArray, whiteArray],
		}

		const output = validateArrayPalette(paletteAsArray)

		expect(warnSpy).not.toHaveBeenCalled()
		expect(getInvalidColorMessageSpy).not.toHaveBeenCalled()
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

		expect(warnSpy).not.toHaveBeenCalled()
		expect(getInvalidColorMessageSpy).not.toHaveBeenCalled()
		expect(getInvalidPaletteMessageSpy).not.toHaveBeenCalled()
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

		expect(warnSpy).toHaveBeenCalledTimes(1)
		expect(getInvalidColorMessageSpy).toHaveBeenCalledTimes(1)
		expect(getInvalidPaletteMessageSpy).not.toHaveBeenCalled()
		expect(output).toEqual(expected)
	})

	it('returns undefined and logs warnings if no valid shades', () => {
		;(validateShade as jest.Mock).mockReturnValue(false)

		const output = validateArrayPalette(paletteAsArray)

		expect(warnSpy).toHaveBeenCalledTimes(4)
		expect(getInvalidColorMessageSpy).toHaveBeenCalledTimes(3)
		expect(getInvalidPaletteMessageSpy).toHaveBeenCalledTimes(1)
		expect(output).toBeUndefined()
	})
})
