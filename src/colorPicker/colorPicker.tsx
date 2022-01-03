import React, { useCallback, useEffect } from "react"
import { useParameter, useGlobals, useStorybookState, useAddonState, useStorybookApi } from '@storybook/api'
import { css, jsx } from '@emotion/react'
// Utils
import { findDefaultPaletteIndex, getColorControls, getColorPalettes, getDefaultPaletteName } from "../utils"
import { ADDON_ID } from "../constants"
// Types
import { AddonState, ColorPalettes, StorybookState } from "./types"
// Components
import Colors from './colors'
import ArgsList from "./argsList/argsList"
import PalettesList from "./palettesList/palettesList"
import CheckBox from "./checkBox/checkBox"
/** @jsx jsx */

const initialAddonState = { storyStates: {} }

const ColorPicker = () => {
	const colorPalettes = useParameter<ColorPalettes>('colorPalettes')
	const defaultColorPalette = useParameter<string>('defaultColorPalette', undefined)
	const additionalControls = useParameter<string[]>('applyColorTo')
	const disableDefaultPalettes = useParameter<boolean>('disableDefaultPalettes')
	const storybookApi = useStorybookApi()
	const [_, updateGlobals] = useGlobals()
	const state = useStorybookState() as StorybookState
	const [addonState, setAddonState] = useAddonState<AddonState>(ADDON_ID, initialAddonState)
	const storyId = state.storyId
	const storyState = addonState?.storyStates?.[storyId]
	const storyPalettes = storyState?.storyPalettes

	useEffect(() => {
		if (storyPalettes?.palettes?.length) {
			return
		}

		const initialStoryPalettes = getColorPalettes(
			defaultColorPalette,
			disableDefaultPalettes,
			colorPalettes?.palettes
		)

		const controls = getColorControls(
			storybookApi.getCurrentStoryData(),
			additionalControls
		)

		const defaultPaletteIndex = findDefaultPaletteIndex(initialStoryPalettes)

		const defaultPalette = getDefaultPaletteName(initialStoryPalettes, defaultPaletteIndex)

		const newState = {
			...addonState,
			storyStates: {
				...addonState.storyStates,
				[storyId]: {
					currentPalette: defaultPaletteIndex || 0,
					controls,
					selectedControls: [] as string[],
					copyOnClick: true,
					storyPalettes: {
						...initialStoryPalettes,
						default: defaultPalette,
					}
				}
			}
		}

		setAddonState(newState)
	}, [colorPalettes])

	useEffect(() => {
		const copyOnClick = storyState?.copyOnClick !== undefined
			? storyState?.copyOnClick
			: true

		updateGlobals({
			selectedArgs: storyState?.selectedControls || [],
			copyOnClick,
		})
	}, [storyId])

	const handleArgsChange = useCallback(
		(newArgs: string[]) => {
			const newState = {
				...addonState,
			}
			const selectedControls = newArgs
			newState.storyStates[storyId].selectedControls = selectedControls

			setAddonState(newState)
			updateGlobals({ selectedArgs: newArgs })
		},
		[addonState]
	)

	const handlePaletteChange = useCallback(
		(newCurrent: number) => {
			const newState = {
				...addonState,
			}

			newState.storyStates[storyId] = {
				...newState.storyStates[storyId],
				currentPalette: newCurrent,
			}

			setAddonState(newState)
		},
		[addonState]
	)

	const handleCopyBoxClick = useCallback(
		() => {
			const newState = {
				...addonState,
			}
			const copy = !newState.storyStates[storyId].copyOnClick
			newState.storyStates[storyId].copyOnClick = copy
			setAddonState(newState)
			updateGlobals({ copyOnClick: copy })
		},
		[addonState]
	)

	const getColors = () => {
		const currentPalette = storyPalettes?.palettes[storyState.currentPalette];

		return currentPalette.palette.map((palette, i) => (
			<Colors
				colors={palette}
				key={`Colors_${palette.label}_${i}`}
			/>
		))
	};

	if (!storyPalettes?.palettes?.length || storyState?.currentPalette === undefined) {
		return null
	}

	return (
		<div
			id="color-picker"
			css={css`
				background: #fff;
				border-radius: 10px;
				max-height: 50vh;
				max-width: 70vw;
				padding: 0 1em 1em 1em;
				overflow-x: hidden;
				overflow-y: auto;
				&::-webkit-scrollbar {
						width: 8px;
						height: 8px;
				}
				&::-webkit-scrollbar-track {
						background: transparent;
				}
				&::-webkit-scrollbar-thumb {
						background: #ccc;
						border-radius: 4px;
						&:hover {
								background-color: #666;
						}
				}
				@media (max-width: 800px) {
						max-width: 95vw;
						padding: 0 .5em .5em .5em;
				}
			`}
		>
			<div css={css`
					display: flex;
					justify-content: space-between;
					align-items: center;
					gap: 2em;
					margin: 1em 0;
					flex-wrap: wrap-reverse;
				`}
			>
				<PalettesList
					palettes={storyPalettes.palettes}
					current={storyState.currentPalette}
					onChange={handlePaletteChange}
				/>
				{(storyState.controls?.length > 0) && (
					<ArgsList
						args={storyState.controls}
						selected={storyState.selectedControls || []}
						onChange={handleArgsChange}
					/>
				)}
				<CheckBox
					label="Copy on click"
					checked={storyState.copyOnClick}
					onClick={handleCopyBoxClick}
				/>
			</div>
			<div>
				{getColors()}
			</div>
		</div>
	)
}

export default ColorPicker
