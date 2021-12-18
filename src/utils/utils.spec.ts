import { paletteAsArray, paletteAsObject } from './testsUtils'
import * as utils from './utils'

describe('validateShade', () => {
	beforeEach(() => {
		jest.clearAllMocks()
		global.CSS = {
			supports: jest.fn(),
			escape: jest.fn(),
		}
		jest.spyOn(utils, 'getInvalidShadeMessage')
	})

	it.each([
		['true', 'valid', true, true],
		['undefined', 'invalid and logs warning', false, undefined],
	])('returns %s if color is %s', (desc1, desc2, isValid, expected) => {
		;(global.CSS.supports as jest.Mock).mockReturnValue(isValid)

		const output = utils.validateShade('foo', 'bar', 'baz')

		if (!isValid) {
			expect(utils.getInvalidShadeMessage).toHaveBeenCalledWith('foo', 'bar', 'baz')
		} else {
			expect(utils.getInvalidShadeMessage).not.toHaveBeenCalled()
		}

		expect(output).toBe(expected)
	})
})

describe('validateArrayPalette', () => {
	beforeEach(() => {
		jest.clearAllMocks()
		global.CSS = {
			supports: jest.fn(),
			escape: jest.fn(),
		}
		jest.spyOn(utils, 'validateShade')
		jest.spyOn(utils, 'warn')
		jest.spyOn(utils, 'getInvalidColorMessage')
		jest.spyOn(utils, 'getInvalidPaletteMessage')
	})

	it('returns transformed palette correctly', () => {
		;(global.CSS.supports as jest.Mock).mockReturnValue(true)

		const expected = {
			name: 'foo',
			palette: [
				{
					label: 'light',
					values: [
						{
							label: '100',
							value: '#fff',
						},
						{
							label: '200',
							value: '#eee',
						},
					],
				},
				{
					label: 'dark',
					values: [
						{
							label: '100',
							value: '#000',
						},
						{
							label: '200',
							value: '#111',
						},
					],
				},
			],
		}

		const output = utils.validateArrayPalette(paletteAsArray)

		expect(utils.validateShade).toHaveBeenCalledTimes(4)
		expect(utils.getInvalidColorMessage).not.toHaveBeenCalled()
		expect(utils.getInvalidPaletteMessage).not.toHaveBeenCalled()
		expect(global.CSS.supports).toBeCalledTimes(4)
		expect(output).toEqual(expected)
	})

	it('returns transformed palette correctly and logs warning when invalid shade', () => {
		;(global.CSS.supports as jest.Mock).mockReturnValue(true).mockReturnValueOnce(false)

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
				{
					label: 'dark',
					values: [
						{
							label: '100',
							value: '#000',
						},
						{
							label: '200',
							value: '#111',
						},
					],
				},
			],
		}

		const output = utils.validateArrayPalette(paletteAsArray)

		expect(utils.validateShade).toHaveBeenCalledTimes(4)
		expect(utils.getInvalidColorMessage).not.toHaveBeenCalled()
		expect(utils.getInvalidPaletteMessage).not.toHaveBeenCalled()
		expect(utils.warn).toHaveBeenCalledTimes(1)
		expect(global.CSS.supports).toBeCalledTimes(4)
		expect(output).toEqual(expected)
	})

	it('returns transformed palette correctly and logs warnings when invalid all color shades', () => {
		;(global.CSS.supports as jest.Mock).mockReturnValue(true).mockReturnValueOnce(false).mockReturnValueOnce(false)

		const expected = {
			name: 'foo',
			palette: [
				{
					label: 'dark',
					values: [
						{
							label: '100',
							value: '#000',
						},
						{
							label: '200',
							value: '#111',
						},
					],
				},
			],
		}

		const output = utils.validateArrayPalette(paletteAsArray)

		expect(utils.validateShade).toHaveBeenCalledTimes(4)
		expect(utils.getInvalidColorMessage).toHaveBeenCalledTimes(1)
		expect(utils.getInvalidPaletteMessage).not.toHaveBeenCalled()
		expect(utils.warn).toHaveBeenCalledTimes(3)
		expect(global.CSS.supports).toHaveBeenCalledTimes(4)
		expect(output).toEqual(expected)
	})

	it('returns undefined and logs warnings if no valid shades', () => {
		;(global.CSS.supports as jest.Mock).mockReturnValue(false)

		const output = utils.validateArrayPalette(paletteAsArray)

		expect(utils.validateShade).toHaveBeenCalledTimes(4)
		expect(utils.getInvalidColorMessage).toHaveBeenCalledTimes(2)
		expect(utils.getInvalidPaletteMessage).toHaveBeenCalledTimes(1)
		expect(utils.warn).toHaveBeenCalledTimes(7)
		expect(global.CSS.supports).toHaveBeenCalledTimes(4)
		expect(output).toEqual(undefined)
	})
})

describe('transformObjectColors', () => {
	beforeEach(() => {
		jest.clearAllMocks()
		jest.spyOn(utils, 'validateShade')
	})

	it('returns transformed colors correctly when value as string', () => {
		;(global.CSS.supports as jest.Mock).mockReturnValue(true)
		const color = Object.entries(paletteAsObject.palette)[0]
		const output = utils.transformObjectColors(paletteAsObject.name, color[0], color[1])

		const expected = {
			label: 'white',
			values: [
				{
					label: 'white',
					value: '#fff',
				},
			],
		}

		expect(utils.validateShade).toHaveBeenCalledTimes(1)
		expect(output).toEqual(expected)
	})

	it('returns undefined and logs workings when incorect value as string', () => {
		;(global.CSS.supports as jest.Mock).mockReturnValue(false)
		const color = Object.entries(paletteAsObject.palette)[0]
		const output = utils.transformObjectColors(paletteAsObject.name, color[0], color[1])

		expect(utils.validateShade).toHaveBeenCalledTimes(1)
		expect(output).toEqual(undefined)
	})

	it('returns transformed colors correctly when value as object', () => {
		;(global.CSS.supports as jest.Mock).mockReturnValue(true)
		const color = Object.entries(paletteAsObject.palette)[1]
		const output = utils.transformObjectColors(paletteAsObject.name, color[0], color[1])

		const expected = {
			label: 'light',
			values: [
				{
					label: '100',
					value: '#fff',
				},
				{
					label: '200',
					value: '#eee',
				},
			],
		}

		expect(utils.validateShade).toHaveBeenCalledTimes(2)
		expect(output).toEqual(expected)
	})

	it('returns transformed colors correctly and logs workings when one incorect object value', () => {
		;(global.CSS.supports as jest.Mock).mockReturnValue(true).mockReturnValueOnce(false)
		const color = Object.entries(paletteAsObject.palette)[1]
		const output = utils.transformObjectColors(paletteAsObject.name, color[0], color[1])

		const expected = {
			label: 'light',
			values: [
				{
					label: '200',
					value: '#eee',
				},
			],
		}

		expect(utils.validateShade).toHaveBeenCalledTimes(2)
		expect(output).toEqual(expected)
	})

	it('returns undefined and logs workings when no corect object values', () => {
		;(global.CSS.supports as jest.Mock).mockReturnValue(false)
		const color = Object.entries(paletteAsObject.palette)[1]
		const output = utils.transformObjectColors(paletteAsObject.name, color[0], color[1])

		expect(utils.validateShade).toHaveBeenCalledTimes(2)
		expect(output).toEqual(undefined)
	})
})

describe('transformObjectPalette', () => {
	beforeEach(() => {
		jest.clearAllMocks()
		jest.spyOn(utils, 'transformObjectColors')
		jest.spyOn(utils, 'getInvalidColorMessage')
		jest.spyOn(utils, 'getInvalidPaletteMessage')
	})

	it('returns transformed palette corectly', () => {
		;(global.CSS.supports as jest.Mock).mockReturnValue(true)
		const output = utils.transformObjectPalette(paletteAsObject)

		const expected = {
			name: 'foo',
			palette: [
				{
					label: 'white',
					values: [{
						label: 'white',
						value: '#fff',
					}]
				},
				{
					label: 'light',
					values: [
						{
							label: '100',
							value: '#fff',
						},
						{
							label: '200',
							value: '#eee',
						},
					],
				},
				{
					label: 'dark',
					values: [
						{
							label: '100',
							value: '#000',
						},
						{
							label: '200',
							value: '#111',
						},
					],
				},
			],
		}

		expect(utils.transformObjectColors).toHaveBeenCalledTimes(3)
		expect(utils.getInvalidColorMessage).not.toHaveBeenCalled()
		expect(utils.getInvalidPaletteMessage).not.toHaveBeenCalled()
		expect(output).toEqual(expected)
	})

	it('returns transformed palette corectly when values of one color are invalid', () => {
		;(global.CSS.supports as jest.Mock).mockReturnValue(true).mockReturnValueOnce(false)
		const output = utils.transformObjectPalette(paletteAsObject)

		const expected = {
			name: 'foo',
			palette: [
				{
					label: 'light',
					values: [
						{
							label: '100',
							value: '#fff',
						},
						{
							label: '200',
							value: '#eee',
						},
					],
				},
				{
					label: 'dark',
					values: [
						{
							label: '100',
							value: '#000',
						},
						{
							label: '200',
							value: '#111',
						},
					],
				},
			],
		}

		expect(utils.transformObjectColors).toHaveBeenCalledTimes(3)
		expect(utils.getInvalidColorMessage).toHaveBeenCalledTimes(1)
		expect(utils.getInvalidPaletteMessage).not.toHaveBeenCalled()
		expect(output).toEqual(expected)
	})
	
	it('returns undefined when values of all colors are invalid', () => {
		;(global.CSS.supports as jest.Mock).mockReturnValue(false)
		const output = utils.transformObjectPalette(paletteAsObject)
		
		expect(utils.transformObjectColors).toHaveBeenCalledTimes(3)
		expect(utils.getInvalidColorMessage).toHaveBeenCalledTimes(3)
		expect(utils.getInvalidPaletteMessage).toHaveBeenCalledTimes(1)
		expect(output).toEqual(undefined)
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
	])('return correct index when %s', (_, defaultPalette, expected) => {
		const input = {
			default: defaultPalette,
			palettes,
		}

		const output = utils.findDefaultPaletteIndex(input)

		expect(output).toEqual(expected)
	})
})
