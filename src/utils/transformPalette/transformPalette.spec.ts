import {
	darkArray,
	lightArray,
	lightObject,
	paletteAsArray,
	paletteAsObject,
	whiteArray,
	whiteObject,
} from '../testsUtils'
import * as transform from '.'
import * as transformation from './transformation'
import * as validation from './validation'
import * as messages from './messages'

describe('validateShade', () => {
	beforeEach(() => {
		jest.clearAllMocks()
		global.CSS = {
			supports: jest.fn(),
			escape: jest.fn(),
		}
		jest.spyOn(messages, 'getInvalidShadeMessage')
	})

	it.each([
		['true', 'valid', true, true],
		['undefined', 'invalid and logs warning', false, undefined],
	])('returns %s if color is %s', (desc1, desc2, isValid, expected) => {
		const CSSSupports = global.CSS.supports as jest.Mock
		CSSSupports.mockReturnValue(isValid)

		const output = validation.validateShade('foo', 'bar', 'baz')

		if (!isValid) {
			expect(messages.getInvalidShadeMessage).toHaveBeenCalledWith('foo', 'bar', 'baz')
		} else {
			expect(messages.getInvalidShadeMessage).not.toHaveBeenCalled()
		}

		expect(output).toBe(expected)
	})
})

describe('validateArrayPalette', () => {
	let validateShadeSpy: jest.SpyInstance
	let warnSpy: jest.SpyInstance

	beforeEach(() => {
		jest.restoreAllMocks()
		validateShadeSpy = jest.spyOn(validation, 'validateShade')
		warnSpy = jest.spyOn(messages, 'warn')
		jest.spyOn(messages, 'getInvalidColorMessage')
		jest.spyOn(messages, 'getInvalidPaletteMessage')
	})

	it('returns transformed palette correctly', () => {
		validateShadeSpy.mockReturnValue(true)

		const expected = {
			name: 'foo',
			palette: [lightArray, darkArray, whiteArray],
		}

		const output = transformation.validateArrayPalette(paletteAsArray)

		expect(validation.validateShade).toHaveBeenCalledTimes(5)
		expect(messages.warn).not.toHaveBeenCalled()
		expect(messages.getInvalidColorMessage).not.toHaveBeenCalled()
		expect(messages.getInvalidPaletteMessage).not.toHaveBeenCalled()
		expect(output).toEqual(expected)
	})

	it('returns transformed palette correctly and logs warning when invalid shade', () => {
		validateShadeSpy.mockReturnValueOnce(false).mockReturnValue(true)

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

		const output = transformation.validateArrayPalette(paletteAsArray)

		expect(validation.validateShade).toHaveBeenCalledTimes(5)
		expect(messages.warn).not.toHaveBeenCalled()
		expect(messages.getInvalidColorMessage).not.toHaveBeenCalled()
		expect(messages.getInvalidPaletteMessage).not.toHaveBeenCalled()
		expect(output).toEqual(expected)
	})

	it('returns transformed palette correctly and logs warnings when invalid all color shades', () => {
		validateShadeSpy.mockReturnValueOnce(false).mockReturnValueOnce(false).mockReturnValue(true)

		const expected = {
			name: 'foo',
			palette: [darkArray, whiteArray],
		}

		const output = transformation.validateArrayPalette(paletteAsArray)

		expect(validation.validateShade).toHaveBeenCalledTimes(5)
		expect(messages.warn).toHaveBeenCalledTimes(1)
		expect(messages.getInvalidColorMessage).toHaveBeenCalledTimes(1)
		expect(messages.getInvalidPaletteMessage).not.toHaveBeenCalled()
		expect(output).toEqual(expected)
	})

	it('returns undefined and logs warnings if no valid shades', () => {
		validateShadeSpy.mockReturnValue(false)

		const output = transformation.validateArrayPalette(paletteAsArray)

		expect(validation.validateShade).toHaveBeenCalledTimes(5)
		expect(messages.warn).toHaveBeenCalledTimes(4)
		expect(messages.getInvalidColorMessage).toHaveBeenCalledTimes(3)
		expect(messages.getInvalidPaletteMessage).toHaveBeenCalledTimes(1)
		expect(output).toBeUndefined()
	})
})

describe('transformObjectColors', () => {
	let validateShadeSpy: jest.SpyInstance
	beforeEach(() => {
		jest.restoreAllMocks()
		validateShadeSpy = jest.spyOn(validation, 'validateShade')
	})

	it('returns transformed colors correctly when value as string', () => {
		validateShadeSpy.mockReturnValue(true)
		const color = Object.entries(whiteObject)[0]
		const output = transformation.transformObjectColors(paletteAsObject.name, color[0], color[1])

		expect(validation.validateShade).toHaveBeenCalledTimes(1)
		expect(output).toEqual(whiteArray)
	})

	it('returns undefined and logs wornings when incorect value as string', () => {
		validateShadeSpy.mockReturnValue(false)
		const color = Object.entries(whiteObject)[0]
		const output = transformation.transformObjectColors(paletteAsObject.name, color[0], color[1])

		expect(validation.validateShade).toHaveBeenCalledTimes(1)
		expect(output).toEqual(undefined)
	})

	it('returns transformed colors correctly when value as object', () => {
		validateShadeSpy.mockReturnValue(true)
		const color = Object.entries(lightObject)[0]
		const output = transformation.transformObjectColors(paletteAsObject.name, color[0], color[1])

		expect(validation.validateShade).toHaveBeenCalledTimes(2)
		expect(output).toEqual(lightArray)
	})

	it('returns transformed colors correctly and logs wornings when one incorect object value', () => {
		validateShadeSpy.mockReturnValueOnce(false).mockReturnValue(true)
		const color = Object.entries(lightObject)[0]
		const output = transformation.transformObjectColors(paletteAsObject.name, color[0], color[1])

		const expected = {
			label: 'light',
			values: [
				{
					label: '200',
					value: '#eee',
				},
			],
		}

		expect(validation.validateShade).toHaveBeenCalledTimes(2)
		expect(output).toEqual(expected)
	})

	it('returns undefined and logs wornings when no corect object values', () => {
		validateShadeSpy.mockReturnValue(false)
		const color = Object.entries(lightObject)[0]
		const output = transformation.transformObjectColors(paletteAsObject.name, color[0], color[1])

		expect(validation.validateShade).toHaveBeenCalledTimes(2)
		expect(output).toEqual(undefined)
	})
})

describe('transformObjectPalette', () => {
	let transformObjectColorsSpy: jest.SpyInstance
	beforeEach(() => {
		jest.resetAllMocks()
		transformObjectColorsSpy = jest.spyOn(transformation, 'transformObjectColors')
		jest.spyOn(messages, 'getInvalidColorMessage')
		jest.spyOn(messages, 'getInvalidPaletteMessage')
	})

	it('returns transformed palette corectly', () => {
		transformObjectColorsSpy
			.mockReturnValueOnce(lightArray)
			.mockReturnValueOnce(darkArray)
			.mockReturnValueOnce(whiteArray)
		const output = transformation.transformObjectPalette(paletteAsObject)

		const expected = {
			name: 'bar',
			palette: [lightArray, darkArray, whiteArray],
		}

		expect(transformation.transformObjectColors).toHaveBeenCalledTimes(3)
		expect(messages.getInvalidColorMessage).not.toHaveBeenCalled()
		expect(messages.getInvalidPaletteMessage).not.toHaveBeenCalled()
		expect(output).toEqual(expected)
	})

	it('returns transformed palette corectly when values of one color are invalid', () => {
		transformObjectColorsSpy
			.mockReturnValueOnce(undefined)
			.mockReturnValueOnce(darkArray)
			.mockReturnValueOnce(whiteArray)

		const output = transformation.transformObjectPalette(paletteAsObject)

		const expected = {
			name: 'bar',
			palette: [darkArray, whiteArray],
		}

		expect(transformation.transformObjectColors).toHaveBeenCalledTimes(3)
		expect(messages.getInvalidColorMessage).toHaveBeenCalledTimes(1)
		expect(messages.getInvalidPaletteMessage).not.toHaveBeenCalled()
		expect(output).toEqual(expected)
	})

	it('returns undefined when values of all colors are invalid', () => {
		transformObjectColorsSpy.mockReturnValue(undefined)

		const output = transformation.transformObjectPalette(paletteAsObject)

		expect(transformation.transformObjectColors).toHaveBeenCalledTimes(3)
		expect(messages.getInvalidColorMessage).toHaveBeenCalledTimes(3)
		expect(messages.getInvalidPaletteMessage).toHaveBeenCalledTimes(1)
		expect(output).toEqual(undefined)
	})
})

describe('transformPalette', () => {
	let validateArrayPaletteSpy: jest.SpyInstance
	let transformObjectPaletteSpy: jest.SpyInstance
	beforeEach(() => {
		jest.restoreAllMocks()
		validateArrayPaletteSpy = jest.spyOn(transformation, 'validateArrayPalette')
		transformObjectPaletteSpy = jest.spyOn(transformation, 'transformObjectPalette')
	})

	it('return transformed palette when palette as array', () => {
		validateArrayPaletteSpy.mockReturnValue(paletteAsArray)
		const output = transform.transformPalette(paletteAsArray)

		expect(transformation.validateArrayPalette).toHaveBeenCalledTimes(1)
		expect(transformation.transformObjectPalette).not.toHaveBeenCalled()
		expect(output).toEqual(paletteAsArray)
	})

	it('return transformed palette when palette as object', () => {
		transformObjectPaletteSpy.mockReturnValue(paletteAsArray)

		const output = transform.transformPalette(paletteAsObject)

		expect(transformation.validateArrayPalette).not.toHaveBeenCalled()
		expect(transformation.transformObjectPalette).toHaveBeenCalledTimes(1)
		expect(output).toEqual(paletteAsArray)
	})
})
