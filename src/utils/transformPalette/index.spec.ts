import { paletteAsArray, paletteAsObject } from '../testsUtils'
import transformPalette from './'
import validateArrayPalette from './validation/validateArrayPalette'
import transformObjectPalette from './transformation/transformObjectPalette'

jest.mock('./validation/validateArrayPalette')
jest.mock('./transformation/transformObjectPalette')

describe('transformPalette', () => {
	const validateArrayPaletteMock = validateArrayPalette as jest.Mock
	const transformObjectPaletteMock = transformObjectPalette as jest.Mock
	
	beforeEach(() => {
		jest.resetAllMocks()
	})

	it('return transformed palette when palette as array', () => {
		validateArrayPaletteMock.mockReturnValue(paletteAsArray)
		const output = transformPalette(paletteAsArray)

		expect(transformObjectPalette).not.toHaveBeenCalled()
		expect(validateArrayPalette).toHaveBeenCalledTimes(1)
		expect(validateArrayPalette).toHaveBeenCalledWith(paletteAsArray)
		expect(output).toEqual(paletteAsArray)
	})
	
	it('return transformed palette when palette as object', () => {
		transformObjectPaletteMock.mockReturnValue(paletteAsArray)
		
		const output = transformPalette(paletteAsObject)
		
		expect(validateArrayPalette).not.toHaveBeenCalled()
		expect(transformObjectPalette).toHaveBeenCalledTimes(1)
		expect(transformObjectPalette).toHaveBeenCalledWith(paletteAsObject)
		expect(output).toEqual(paletteAsArray)
	})
})
