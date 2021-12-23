import { darkArray, lightArray, paletteAsObject, whiteArray } from '../../../testsUtils'
import transformObjectPalette from './'
import validateObjectColors from '../../validation/validateObjectColors'
import * as messages from '../../messages'

jest.mock('../../validation/validateObjectColors')

describe('transformObjectPalette', () => {
	beforeEach(() => {
		jest.resetAllMocks()
		jest.spyOn(messages, 'getInvalidColorMessage')
		jest.spyOn(messages, 'getInvalidPaletteMessage')
	})

	it('returns transformed palette corectly', () => {
		(validateObjectColors as jest.Mock)
			.mockReturnValueOnce(lightArray)
			.mockReturnValueOnce(darkArray)
			.mockReturnValueOnce(whiteArray)
		const output = transformObjectPalette(paletteAsObject)

		const expected = {
			name: 'bar',
			palette: [lightArray, darkArray, whiteArray],
		}

		expect(validateObjectColors).toHaveBeenCalledTimes(3)
		expect(messages.getInvalidColorMessage).not.toHaveBeenCalled()
		expect(messages.getInvalidPaletteMessage).not.toHaveBeenCalled()
		expect(output).toEqual(expected)
	})

	it('returns transformed palette corectly when values of one color are invalid', () => {
		(validateObjectColors as jest.Mock)
			.mockReturnValueOnce(undefined)
			.mockReturnValueOnce(darkArray)
			.mockReturnValueOnce(whiteArray)

		const output = transformObjectPalette(paletteAsObject)

		const expected = {
			name: 'bar',
			palette: [darkArray, whiteArray],
		}

		expect(validateObjectColors).toHaveBeenCalledTimes(3)
		expect(messages.getInvalidColorMessage).toHaveBeenCalledTimes(1)
		expect(messages.getInvalidPaletteMessage).not.toHaveBeenCalled()
		expect(output).toEqual(expected)
	})

	it('returns undefined when values of all colors are invalid', () => {
		(validateObjectColors as jest.Mock).mockReturnValue(undefined)

		const output = transformObjectPalette(paletteAsObject)

		expect(validateObjectColors).toHaveBeenCalledTimes(3)
		expect(messages.getInvalidColorMessage).toHaveBeenCalledTimes(3)
		expect(messages.getInvalidPaletteMessage).toHaveBeenCalledTimes(1)
		expect(output).toEqual(undefined)
	})
})
