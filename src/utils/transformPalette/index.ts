import {
  PaletteAsArray,
  PaletteAsObject,
  PaletteObj,
} from 'src/colorPicker/types'
import transformArrayPalette from './transformation/transformArrayPalette'
import transformObjectPalette from './transformation/transformObjectPalette'

const transformPalette = (paletteObj: PaletteObj) => {
  if (Array.isArray(paletteObj.palette)) {
    return transformArrayPalette(paletteObj as PaletteAsArray)
  }

  return transformObjectPalette(paletteObj as PaletteAsObject)
}

export default transformPalette
