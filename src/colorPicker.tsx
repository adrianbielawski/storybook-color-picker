import React, { useCallback } from "react";
import { useGlobals } from "@storybook/api";
import { Icons, IconButton, WithTooltip } from "@storybook/components";
import { TOOL_ID } from "./constants";
import Tooltip from './tooltip/tooltip';

const ColorPicker = () => {
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
			tooltip={<Tooltip />}
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

export default ColorPicker;