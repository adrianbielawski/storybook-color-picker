import { paletteAsArray, paletteAsObject } from '../testsUtils'
import validation from './validation'
import transformPalette from './'
import validateArrayPalette from './validation/validateArrayPalette'
import transformObjectPalette from './transformation/transformObjectPalette'

jest.mock('../../validation/validateArrayPalette')
jest.mock('../transformObjectPalette')

describe('transformPalette', () => {
	beforeEach(() => {
		jest.resetAllMocks()
	})

	it('return transformed palette when palette as array', () => {
		(validateArrayPalette as jest.Mock).mockReturnValue(paletteAsArray)
		const output = transformPalette(paletteAsArray)

		expect(validation.validateArrayPalette).toHaveBeenCalledTimes(1)
		expect(transformObjectPalette).not.toHaveBeenCalled()
		expect(output).toEqual(paletteAsArray)
	})

	it('return transformed palette when palette as object', () => {
		(transformObjectPalette as jest.Mock).mockReturnValue(paletteAsArray)

		const output = transformPalette(paletteAsObject)

		expect(validation.validateArrayPalette).not.toHaveBeenCalled()
		expect(transformObjectPalette).toHaveBeenCalledTimes(1)
		expect(output).toEqual(paletteAsArray)
	})
})

// describe('validateArrayPalette', () => {
// 	let warnSpy: jest.SpyInstance

// 	beforeEach(() => {
// 		jest.resetAllMocks()
// 		warnSpy = jest.spyOn(messages, 'warn')
// 		jest.spyOn(messages, 'getInvalidColorMessage')
// 		jest.spyOn(messages, 'getInvalidPaletteMessage')
// 	})

// 	it('returns transformed palette correctly', () => {
// 		(validateShade as jest.Mock).mockReturnValue(true)

// 		const expected = {
// 			name: 'foo',
// 			palette: [lightArray, darkArray, whiteArray],
// 		}

// 		const output = validation.validateArrayPalette(paletteAsArray)

// 		expect(validateShade).toHaveBeenCalledTimes(5)
// 		expect(messages.warn).not.toHaveBeenCalled()
// 		expect(messages.getInvalidColorMessage).not.toHaveBeenCalled()
// 		expect(messages.getInvalidPaletteMessage).not.toHaveBeenCalled()
// 		expect(output).toEqual(expected)
// 	})

// 	it('returns transformed palette correctly and logs warning when invalid shade', () => {
// 		(validateShade as jest.Mock).mockReturnValueOnce(false).mockReturnValue(true)

// 		const expected = {
// 			name: 'foo',
// 			palette: [
// 				{
// 					label: 'light',
// 					values: [
// 						{
// 							label: '200',
// 							value: '#eee',
// 						},
// 					],
// 				},
// 				darkArray,
// 				whiteArray,
// 			],
// 		}

// 		const output = validation.validateArrayPalette(paletteAsArray)

// 		expect(validateShade).toHaveBeenCalledTimes(5)
// 		expect(messages.warn).not.toHaveBeenCalled()
// 		expect(messages.getInvalidColorMessage).not.toHaveBeenCalled()
// 		expect(messages.getInvalidPaletteMessage).not.toHaveBeenCalled()
// 		expect(output).toEqual(expected)
// 	})

// 	it('returns transformed palette correctly and logs warnings when invalid all color shades', () => {
// 		(validateShade as jest.Mock).mockReturnValueOnce(false).mockReturnValueOnce(false).mockReturnValue(true)

// 		const expected = {
// 			name: 'foo',
// 			palette: [darkArray, whiteArray],
// 		}

// 		const output = validation.validateArrayPalette(paletteAsArray)

// 		expect(validateShade).toHaveBeenCalledTimes(5)
// 		expect(messages.warn).toHaveBeenCalledTimes(1)
// 		expect(messages.getInvalidColorMessage).toHaveBeenCalledTimes(1)
// 		expect(messages.getInvalidPaletteMessage).not.toHaveBeenCalled()
// 		expect(output).toEqual(expected)
// 	})

// 	it('returns undefined and logs warnings if no valid shades', () => {
// 		(validateShade as jest.Mock).mockReturnValue(false)

// 		const output = validation.validateArrayPalette(paletteAsArray)

// 		expect(validateShade).toHaveBeenCalledTimes(5)
// 		expect(messages.warn).toHaveBeenCalledTimes(4)
// 		expect(messages.getInvalidColorMessage).toHaveBeenCalledTimes(3)
// 		expect(messages.getInvalidPaletteMessage).toHaveBeenCalledTimes(1)
// 		expect(output).toBeUndefined()
// 	})
// })

// describe('validateObjectColors', () => {
// 	let validateShadeSpy: jest.SpyInstance
// 	beforeEach(() => {
// 		jest.restoreAllMocks()
// 		validateShadeSpy = jest.spyOn(validation, 'validateShade')
// 	})

// 	it('returns transformed colors correctly when value as string', () => {
// 		validateShadeSpy.mockReturnValue(true)
// 		const color = Object.entries(whiteObject)[0]
// 		const output = validation.validateObjectColors(paletteAsObject.name, color[0], color[1])

// 		expect(validation.validateShade).toHaveBeenCalledTimes(1)
// 		expect(output).toEqual(whiteArray)
// 	})

// 	it('returns undefined and logs wornings when incorect value as string', () => {
// 		validateShadeSpy.mockReturnValue(false)
// 		const color = Object.entries(whiteObject)[0]
// 		const output = validation.validateObjectColors(paletteAsObject.name, color[0], color[1])

// 		expect(validation.validateShade).toHaveBeenCalledTimes(1)
// 		expect(output).toEqual(undefined)
// 	})

// 	it('returns transformed colors correctly when value as object', () => {
// 		validateShadeSpy.mockReturnValue(true)
// 		const color = Object.entries(lightObject)[0]
// 		const output = validation.validateObjectColors(paletteAsObject.name, color[0], color[1])

// 		expect(validation.validateShade).toHaveBeenCalledTimes(2)
// 		expect(output).toEqual(lightArray)
// 	})

// 	it('returns transformed colors correctly and logs wornings when one incorect object value', () => {
// 		validateShadeSpy.mockReturnValueOnce(false).mockReturnValue(true)
// 		const color = Object.entries(lightObject)[0]
// 		const output = validation.validateObjectColors(paletteAsObject.name, color[0], color[1])

// 		const expected = {
// 			label: 'light',
// 			values: [
// 				{
// 					label: '200',
// 					value: '#eee',
// 				},
// 			],
// 		}

// 		expect(validation.validateShade).toHaveBeenCalledTimes(2)
// 		expect(output).toEqual(expected)
// 	})

// 	it('returns undefined and logs wornings when no corect object values', () => {
// 		validateShadeSpy.mockReturnValue(false)
// 		const color = Object.entries(lightObject)[0]
// 		const output = validation.validateObjectColors(paletteAsObject.name, color[0], color[1])

// 		expect(validation.validateShade).toHaveBeenCalledTimes(2)
// 		expect(output).toEqual(undefined)
// 	})
// })

// describe('transformObjectPalette', () => {
// 	let validateObjectColorsSpy: jest.SpyInstance
// 	beforeEach(() => {
// 		jest.resetAllMocks()
// 		validateObjectColorsSpy = jest.spyOn(validation, 'validateObjectColors')
// 		jest.spyOn(messages, 'getInvalidColorMessage')
// 		jest.spyOn(messages, 'getInvalidPaletteMessage')
// 	})

// 	it('returns transformed palette corectly', () => {
// 		validateObjectColorsSpy
// 			.mockReturnValueOnce(lightArray)
// 			.mockReturnValueOnce(darkArray)
// 			.mockReturnValueOnce(whiteArray)
// 		const output = transformation.transformObjectPalette(paletteAsObject)

// 		const expected = {
// 			name: 'bar',
// 			palette: [lightArray, darkArray, whiteArray],
// 		}

// 		expect(validation.validateObjectColors).toHaveBeenCalledTimes(3)
// 		expect(messages.getInvalidColorMessage).not.toHaveBeenCalled()
// 		expect(messages.getInvalidPaletteMessage).not.toHaveBeenCalled()
// 		expect(output).toEqual(expected)
// 	})

// 	it('returns transformed palette corectly when values of one color are invalid', () => {
// 		validateObjectColorsSpy
// 			.mockReturnValueOnce(undefined)
// 			.mockReturnValueOnce(darkArray)
// 			.mockReturnValueOnce(whiteArray)

// 		const output = transformation.transformObjectPalette(paletteAsObject)

// 		const expected = {
// 			name: 'bar',
// 			palette: [darkArray, whiteArray],
// 		}

// 		expect(validation.validateObjectColors).toHaveBeenCalledTimes(3)
// 		expect(messages.getInvalidColorMessage).toHaveBeenCalledTimes(1)
// 		expect(messages.getInvalidPaletteMessage).not.toHaveBeenCalled()
// 		expect(output).toEqual(expected)
// 	})

// 	it('returns undefined when values of all colors are invalid', () => {
// 		validateObjectColorsSpy.mockReturnValue(undefined)

// 		const output = transformation.transformObjectPalette(paletteAsObject)

// 		expect(validation.validateObjectColors).toHaveBeenCalledTimes(3)
// 		expect(messages.getInvalidColorMessage).toHaveBeenCalledTimes(3)
// 		expect(messages.getInvalidPaletteMessage).toHaveBeenCalledTimes(1)
// 		expect(output).toEqual(undefined)
// 	})
// })
