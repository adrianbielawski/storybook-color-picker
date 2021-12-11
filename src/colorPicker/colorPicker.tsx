import React, { useCallback, useEffect } from "react";
import { useParameter, useGlobals, useStorybookState, useAddonState, useStorybookApi } from '@storybook/api';
import { css, jsx } from '@emotion/react';
// Utils
import { findDefaultPaletteIndex, getColorControls, transformPalette } from "../utils/utils";
import { ADDON_ID } from "../constants";
// Types
import { AddonState, ColorPalettes, StatePalettes, StorybookState } from "./types";
// Components
import Colors from './colors';
import ArgsList from "./argsList/argsList";
import PalettesList from "./palettesList/palettesList";
import CheckBox from "./checkBox/checkBox";
/** @jsx jsx */

const initialAddonState = { storyStates: {} }

const ColorPicker = () => {
    const colorPalettes = useParameter<ColorPalettes>('colorPalettes');
    const defaultColorPalette = useParameter<string>('defaultColorPalette', undefined);
    const additionalControls = useParameter<string[]>('applyColorTo');
    const storybookApi = useStorybookApi();
    const [globals, updateGlobals] = useGlobals();
    const state = useStorybookState() as StorybookState;
    const [addonState, setAddonState] = useAddonState<AddonState>(ADDON_ID, initialAddonState);
    const storyId = state.storyId
    const storyState = addonState?.storyStates?.[storyId]
    const storyPalettes = storyState?.storyPalettes

    useEffect(() => {
        if (storyPalettes?.palettes.length) {
            return
        }

        const transformedPalettes: StatePalettes = {
            default: defaultColorPalette,
            palettes: []
        }

        colorPalettes.palettes.forEach(p => {
            const transformed = transformPalette(p)

            if (transformed) {
                const palette = {
                    name: p.name,
                    colors: transformed,
                }

                transformedPalettes.palettes.push(palette)
            }
        })

        const controls = getColorControls(
            storybookApi.getCurrentStoryData(),
            additionalControls
        );

        const defaultPalette = transformedPalettes.palettes.length
            ? findDefaultPaletteIndex(transformedPalettes)
                ? transformedPalettes.default
                : transformedPalettes.palettes[0].name
            : null

        const newState = {
            ...addonState,
            storyStates: {
                ...addonState.storyStates,
                [storyId]: {
                    currentPalette: 0,
                    controls,
                    storyPalettes: {
                        ...transformedPalettes,
                        default: defaultPalette,
                    }
                }
            }
        }

        setAddonState(newState)
    }, [colorPalettes])

    useEffect(() => {
        const copyOnClick = globals.copyOnClick !== undefined
            ? globals.copyOnClick
            : true;

        updateGlobals({ selectedArgs: [], copyOnClick });
    }, [storyId])

    const handleArgsChange = (newArgs: string[]) => {
        updateGlobals({ selectedArgs: newArgs });
    }

    const handlePaletteChange = useCallback(
        (newCurrent: number) => {
            const newState = {
                ...addonState,
            }
    
            newState.storyStates[storyId] = {
                ...newState.storyStates[storyId],
                currentPalette: newCurrent,
            }
    
            setAddonState(newState);
        },
        [addonState],
    );

    const handleCopyBoxClick = () => {
        updateGlobals({ copyOnClick: !globals.copyOnClick });
    }

    const getColors = () => {
        const currentPalette = storyPalettes?.palettes[storyState.currentPalette];

        return currentPalette.colors.map((colors, i) => (
            <Colors
                colors={colors}
                key={`Colors_${colors.label}_${i}`}
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
                        selected={globals.selectedArgs || []}
                        onChange={handleArgsChange}
                    />
                )}
                <CheckBox
                    label="Copy on click"
                    checked={globals.copyOnClick}
                    onClick={handleCopyBoxClick}
                />
            </div>
            <div>
                {getColors()}
            </div>
        </div>
    );
};

export default ColorPicker;
