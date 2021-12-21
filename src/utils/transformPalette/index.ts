import { PaletteAsArray, PaletteAsObject, PaletteObj } from "src/colorPicker/types";
import { transformObjectPalette, validateArrayPalette } from "./transformation";

export const transformPalette = (paletteObj: PaletteObj) => {
	if (Array.isArray(paletteObj.palette)) {
		return validateArrayPalette(paletteObj as PaletteAsArray);
	}

	return transformObjectPalette(paletteObj as PaletteAsObject)
};