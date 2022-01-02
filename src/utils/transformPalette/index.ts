import { PaletteAsArray, PaletteAsObject, PaletteObj } from 'src/colorPicker/types'
import transformObjectPalette from './transformation/transformObjectPalette'
import validateArrayPalette from './validation/validateArrayPalette'

const transformPalette = (paletteObj: PaletteObj) => {
	if (Array.isArray(paletteObj.palette)) {
		return validateArrayPalette(paletteObj as PaletteAsArray)
	}

	return transformObjectPalette(paletteObj as PaletteAsObject)
}

export default transformPalette