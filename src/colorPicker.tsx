import React, { useCallback } from "react";
import { useGlobals } from "@storybook/api";
import { Icons, IconButton } from "@storybook/components";
import { TOOL_ID } from "./constants";

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
		<IconButton
			key={TOOL_ID}
			active={isColorPickerActive}
			title="Apply outlines to the preview"
			onClick={toggleColorPicker}
		>
			<Icons icon="paintbrush" />
		</IconButton>
	);
};

export default ColorPicker;