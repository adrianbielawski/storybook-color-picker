/** @jsx jsx */
import { useCallback, useEffect } from 'react'
import {
  useParameter,
  useStorybookState,
  useAddonState,
  useStorybookApi,
} from '@storybook/manager-api'
import { ArgTypes } from '@storybook/types'
import { css, jsx } from '@emotion/react'
import {
  findPrimaryPaletteIndex,
  getColorControls,
  getColorPalettes,
  getPrimaryPaletteName,
  reportInvalidPalettes,
} from '../utils'
import { ADDON_ID } from '../constants'
import { AddonState, ColorPickerParameters, StorybookState } from './types'
import ArgsList from './argsList/argsList'
import PalettesList from './palettesList/palettesList'
import CheckBox from './checkBox/checkBox'
import Palette from './palette'
import { useTheme } from '../hooks'

const initialAddonState = { storyStates: {} }

const ColorPicker = () => {
  const { commonTheme, theme } = useTheme()
  const colorPicker = useParameter<ColorPickerParameters>('colorPicker') || {}

  const {
    primaryPalette,
    palettes,
    applyColorTo: additionalControls,
    disableDefaultPalettes,
  } = colorPicker

  const storybookApi = useStorybookApi()
  const state = useStorybookState() as StorybookState
  const [addonState, setAddonState] = useAddonState<AddonState>(
    ADDON_ID,
    initialAddonState,
  )
  const storyId = state.storyId
  const storyState = addonState?.storyStates?.[storyId]
  const storyPalettes = storyState?.storyPalettes

  useEffect(() => {
    if (storyPalettes?.palettes?.length) {
      return
    }

    const validatedStoryPalettes = getColorPalettes(
      disableDefaultPalettes,
      palettes,
    )

    const initialStoryPalettes = {
      palettes: validatedStoryPalettes.palettes,
      primaryPalette,
    }

    if (validatedStoryPalettes.invalidPalettes.length) {
      reportInvalidPalettes(validatedStoryPalettes.invalidPalettes)
    }

    const primaryPaletteIndex = findPrimaryPaletteIndex(initialStoryPalettes)

    const primaryPaletteName = getPrimaryPaletteName(
      initialStoryPalettes,
      primaryPaletteIndex,
    )

    const storyData = storybookApi.getCurrentStoryData() as {
      argTypes?: ArgTypes
    }

    const controls = getColorControls(
      storyData?.argTypes || {},
      additionalControls,
    )

    const newState = {
      ...addonState,
      storyStates: {
        ...addonState.storyStates,
        [storyId]: {
          currentPalette: primaryPaletteIndex || 0,
          controls,
          selectedControls: [] as string[],
          copyOnClick: true,
          storyPalettes: {
            ...initialStoryPalettes,
            primaryPalette: primaryPaletteName,
          },
        },
      },
    }

    setAddonState(newState)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorPicker])

  const handleArgsChange = useCallback(
    (newArgs: string[]) => {
      const newState = {
        ...addonState,
      }
      const selectedControls = newArgs
      newState.storyStates[storyId].selectedControls = selectedControls

      setAddonState(newState)
    },
    [addonState, setAddonState, storyId],
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
    [addonState, setAddonState, storyId],
  )

  const handleCopyBoxClick = useCallback(() => {
    const newState = {
      ...addonState,
    }
    const copy = !newState.storyStates[storyId].copyOnClick
    newState.storyStates[storyId].copyOnClick = copy
    setAddonState(newState)
  }, [addonState, setAddonState, storyId])

  if (
    !storyPalettes?.palettes?.length ||
    storyState?.currentPalette === undefined
  ) {
    return null
  }

  const currentPalette =
    storyPalettes?.palettes[storyState.currentPalette].palette

  return (
    <div
      id="color-picker"
      css={css`
        * {
          color: ${`${theme.text.primary}`};
          border-color: ${`${theme.border.primary}`};
        }

        background: ${`${theme.background.main}`};
        border-radius: 8px;
        max-height: 50vh;
        max-width: 70vw;
        padding: 0 1em 1em 1em;
        overflow-x: hidden;
        overflow-y: scroll;
        &::-webkit-scrollbar {
          width: 0.5em;
          height: 0.5em;
        }
        &::-webkit-scrollbar-track {
          background: ${`${commonTheme.scrollBar.track}`};
        }
        &::-webkit-scrollbar-thumb {
          background: ${`${commonTheme.scrollBar.thumb}`};
          border-radius: 0.25em;
          &:hover {
            background-color: ${`${commonTheme.scrollBar.thumbHover}`};
          }
        }
        @media (max-width: 800px) {
          max-width: 95vw;
          padding: 0 0.5em 0.5em 0.5em;
        }
      `}
    >
      <div
        css={css`
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
        {storyState.controls?.length > 0 && (
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
      <Palette palette={currentPalette} />
    </div>
  )
}

export default ColorPicker
