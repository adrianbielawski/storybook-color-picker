import React, { useCallback, useState } from "react"
import { useParameter } from "@storybook/api"
import { Icons, IconButton, WithTooltip } from "@storybook/components"
import { TOOL_ID } from "./constants"
import ColorPicker from './colorPicker/colorPicker'
import { ColorPickerParameters } from "./colorPicker/types"

const ColorPickerIcon = () => {
	const [isActive, setIsActive] = useState(false)
	const colorPicker = useParameter<ColorPickerParameters>('colorPicker')
	const colorPalettes = useParameter<ColorPickerParameters>('colorPalettes')
	const disableDefaultPalettes = colorPicker?.disableDefaultPalettes || colorPalettes?.disableDefaultPalettes
	const palettes = colorPicker?.palettes || colorPalettes?.palettes

	const toggleColorPicker = useCallback(
		(visible: boolean) => {
			if (visible !== isActive) {
				setIsActive(!isActive)
			}
		},
		[isActive]
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
			onVisibilityChange={toggleColorPicker}
		>
			<IconButton
				key={TOOL_ID}
				active={isActive}
				title="Color palettes"
			>
				<Icons icon="paintbrush" />
			</IconButton>
		</WithTooltip>
	)
}

export default ColorPickerIcon