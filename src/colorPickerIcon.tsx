import React, { useCallback } from "react";
import { useGlobals, useParameter } from "@storybook/api";
import { Icons, IconButton, WithTooltip } from "@storybook/components";
import { TOOL_ID } from "./constants";
import ColorPicker from './colorPicker/colorPicker';
import { ColorPalettes } from "./colorPicker/types";

const ColorPickerIcon = () => {
	const [{ isColorPickerActive }, updateGlobals] = useGlobals();
	const disableDefaultPalettes = useParameter<boolean>('disableDefaultPalettes')
  const colorPalettes: ColorPalettes = useParameter('colorPalettes');

	const toggleColorPicker = useCallback(
		() =>
			updateGlobals({
				isColorPickerActive: !isColorPickerActive,
			}),
		[isColorPickerActive]
	);

	if (
		(!colorPalettes && disableDefaultPalettes)
		|| (!colorPalettes?.palettes.length && disableDefaultPalettes)
	) {
		return null
	}

	return (
		<WithTooltip
			placement="bottom"
			trigger="click"
			tooltipShown={true}
			tooltip={<ColorPicker />}
			closeOnClick
		>
			<IconButton
				key={TOOL_ID}
				active={isColorPickerActive}
				title="Color palettes"
				onClick={toggleColorPicker}
			>
				<Icons icon="paintbrush" />
			</IconButton>
		</WithTooltip>
	);
};

export default ColorPickerIcon;