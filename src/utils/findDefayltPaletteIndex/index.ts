import { StatePalettes } from "src/colorPicker/types";

export const findDefaultPaletteIndex = (palettes: StatePalettes) => {
	const index = palettes.palettes.findIndex(palette => palette.name === palettes.default)

	return index;
};