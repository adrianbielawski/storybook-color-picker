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

const ColorPicker = () => {
    const colorPalettes = useParameter<ColorPalettes>('colorPalettes');
    const defaultColorPalette = useParameter<string>('defaultColorPalette', undefined);
    const additionalApplyColorTo = useParameter<string[]>('applyColorTo');
    const storybookApi = useStorybookApi();
    const [globals, updateGlobals] = useGlobals();
    const state = useStorybookState() as StorybookState;
    const [addonState, setAddonState] = useAddonState<AddonState>(ADDON_ID, { currentPalette: 0 });

    useEffect(() => {
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

        const defaultPalette = transformedPalettes.palettes.length
            ? findDefaultPaletteIndex(transformedPalettes)
                ? transformedPalettes.default
                : transformedPalettes.palettes[0].name
            : null

        state.colorPalettes = {
            ...transformedPalettes,
            default: defaultPalette,
        }
    }, [colorPalettes])

    useEffect(() => {
        if (!state.colorPalettes) {
            return
        }

        const index = findDefaultPaletteIndex(state.colorPalettes)
        const currentPalette = state.colorPalettes.palettes.length
            ? index >= 0
                ? index
                : 0
            : null
        
        const applyColorTo = getColorControls(
            storybookApi.getCurrentStoryData(),
            additionalApplyColorTo
        );

        setAddonState({
            ...addonState,
            currentPalette: currentPalette,
            applyColorTo,
        });
    }, [state.colorPalettes])

    useEffect(() => {
        const copyOnClick = globals.copyOnClick !== undefined
            ? globals.copyOnClick
            : true;

        updateGlobals({ selectedArgs: [], copyOnClick });
    }, [state.storyId])

    const handleArgsChange = (newArgs: string[]) => {
        updateGlobals({ selectedArgs: newArgs });
    }

    const handlePaletteChange = useCallback(
        (newCurrent: number) => {
            setAddonState({
                ...addonState,
                currentPalette: newCurrent,
            })
        },
        [addonState],
    );

    const handleCopyBoxClick = () => {
        updateGlobals({ copyOnClick: !globals.copyOnClick });
    }

    const getColors = () => {
        const currentPalette = state.colorPalettes.palettes[addonState.currentPalette];

        return currentPalette.colors.map((colors, i) => (
            <Colors
                colors={colors}
                key={`Colors_${colors.label}_${i}`}
            />
        ))
    };
    
    if (!state.colorPalettes?.palettes?.length) {
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
                    palettes={state.colorPalettes.palettes}
                    current={addonState.currentPalette}
                    onChange={handlePaletteChange}
                />
                {(addonState.applyColorTo?.length > 0) && (
                    <ArgsList
                        args={addonState.applyColorTo}
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
