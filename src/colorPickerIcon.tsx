import React, { useCallback } from "react"
import { useGlobals, useParameter } from "@storybook/api"
import { Icons, IconButton, WithTooltip } from "@storybook/components"
import { TOOL_ID } from "./constants"
import ColorPicker from './colorPicker/colorPicker'
import { ColorPickerParameters } from "./colorPicker/types"

const ColorPickerIcon = () => {
	const [{ isColorPickerActive }, updateGlobals] = useGlobals()
	const colorPicker = useParameter<ColorPickerParameters>('colorPicker')
	const colorPalettes = useParameter<ColorPickerParameters>('colorPalettes')
	const disableDefaultPalettes = colorPicker?.disableDefaultPalettes || colorPalettes?.disableDefaultPalettes
	const palettes = colorPicker?.palettes || colorPalettes?.palettes

	const toggleColorPicker = useCallback(
		() =>
			updateGlobals({
				isColorPickerActive: !isColorPickerActive,
			}),
		[isColorPickerActive]
	)

	if (!palettes?.length && disableDefaultPalettes) {
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
	)
}

export default ColorPickerIcon