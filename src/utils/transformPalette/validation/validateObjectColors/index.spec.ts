import { lightArray, lightObject, paletteAsObject, whiteArray, whiteObject } from '../../../testsUtils'
import validateShade from '../validateShade'
import validateObjectColors from '../validateObjectColors'

jest.mock('../validateShade')

describe('validateObjectColors', () => {
	beforeEach(() => {
		jest.resetAllMocks()
	})

	it('returns transformed colors correctly when value as string', () => {
		;(validateShade as jest.Mock).mockReturnValue(true)
		const color = Object.entries(whiteObject)[0]
		const output = validateObjectColors(paletteAsObject.name, color[0], color[1])

		expect(validateShade).toHaveBeenCalledTimes(1)
		expect(output).toEqual(whiteArray)
	})

	it('returns undefined and logs wornings when incorect value as string', () => {
		;(validateShade as jest.Mock).mockReturnValue(false)
		const color = Object.entries(whiteObject)[0]
		const output = validateObjectColors(paletteAsObject.name, color[0], color[1])

		expect(validateShade).toHaveBeenCalledTimes(1)
		expect(output).toEqual(undefined)
	})

	it('returns transformed colors correctly when value as object', () => {
		;(validateShade as jest.Mock).mockReturnValue(true)
		const color = Object.entries(lightObject)[0]
		const output = validateObjectColors(paletteAsObject.name, color[0], color[1])

		expect(validateShade).toHaveBeenCalledTimes(2)
		expect(output).toEqual(lightArray)
	})

	it('returns transformed colors correctly and logs wornings when one incorect object value', () => {
		;(validateShade as jest.Mock).mockReturnValueOnce(false).mockReturnValue(true)
		const color = Object.entries(lightObject)[0]
		const output = validateObjectColors(paletteAsObject.name, color[0], color[1])

		const expected = {
			label: 'light',
			values: [
				{
					label: '200',
					value: '#eee',
				},
			],
		}

		expect(validateShade).toHaveBeenCalledTimes(2)
		expect(output).toEqual(expected)
	})

	it('returns undefined and logs wornings when no corect object values', () => {
		;(validateShade as jest.Mock).mockReturnValue(false)
		const color = Object.entries(lightObject)[0]
		const output = validateObjectColors(paletteAsObject.name, color[0], color[1])

		expect(validateShade).toHaveBeenCalledTimes(2)
		expect(output).toEqual(undefined)
	})
})
