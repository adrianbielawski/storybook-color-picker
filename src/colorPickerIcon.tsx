import React, { useCallback } from "react";
import { useGlobals } from "@storybook/api";
import { Icons, IconButton, WithTooltip } from "@storybook/components";
import { TOOL_ID } from "./constants";
import ColorPicker from './colorPicker/colorPicker';

const ColorPickerIcon = () => {
	const [{ isColorPickerActive }, updateGlobals] = useGlobals();

	const toggleColorPicker = useCallback(
		() =>
			updateGlobals({
				isColorPickerActive: !isColorPickerActive,
			}),
		[isColorPickerActive]
	);

	return (
		<WithTooltip
			placement="top"
			trigger="click"
			tooltipShown={true}
			tooltip={<ColorPicker />}
			closeOnClick
		>
			<IconButton
				key={TOOL_ID}
				active={isColorPickerActive}
				title="Apply outlines to the preview"
				onClick={toggleColorPicker}
			>
				<Icons icon="paintbrush" />
			</IconButton>
		</WithTooltip>
	);
};

export default ColorPickerIcon;