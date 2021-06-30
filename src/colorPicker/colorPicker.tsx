import React, { useCallback, useEffect, useState } from "react";
import { useParameter, useGlobals, useStorybookState } from '@storybook/api';
import { css, jsx } from '@emotion/react';
// Utils
import { findDefaultPaletteIndex, transformPalette } from "../utils/utils";
// Types
import { ColorPalettes } from "./types";
// Components
import Colors from './colors';
import ArgsList from "./argsList/argsList";
import PalettesList from "./palettesList/palettesList";
/** @jsx jsx */

const ColorPicker = () => {
    const colorPalettes: ColorPalettes = useParameter('colorPalettes');
    const defaultColorPalette = useParameter('defaultColorPalette', undefined);
    const applyColorTo: string[] = useParameter('applyColorTo');
    const [globals, updateGlobals] = useGlobals();
    const state = useStorybookState();
    const [current, setCurrent] = useState(findDefaultPaletteIndex(
        colorPalettes.palettes,
        defaultColorPalette || colorPalettes.default
    ));

    if (!colorPalettes.palettes.length) {
        return null
    }

    useEffect(() => {
        updateGlobals({ selectedArgs: [] })
    }, [state.storyId])

    const handleArgsChange = (newArgs: string[]) => {
        updateGlobals({ selectedArgs: newArgs })
    }

    const handlePaletteChange = useCallback(
        (newCurrent: number) => {
            setCurrent(newCurrent)
        },
        [],
    );

    const getColors = () => {
        const currentPalette = colorPalettes.palettes[current];
        const transformedPalette = transformPalette(currentPalette.palette);

        return transformedPalette.map((colors, i) => (
            <Colors
                colors={colors}
                key={`Colors_${colors.label}_${i}`}
            />
        ))
    };

    return (
        <div
            id="color-picker"
            css={css`
                background: #fff;
                border-radius: 10px;
                max-height: 50vh;
                max-width: 40vw;
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
            `}
        >
            <div
                css={css`
                    font-size: 1.2em;
                    margin: 1em;
                    text-align: center;
                `}
            >
                Click on color to copy to clipboard
            </div>
            <div css={css`
                    display: flex;
                    gap: 2em;
                `}
            >
                <PalettesList
                    palettes={colorPalettes.palettes}
                    current={current}
                    onChange={handlePaletteChange}
                />
                {(applyColorTo && applyColorTo.length > 0) && (
                    <ArgsList
                        args={applyColorTo}
                        selected={globals.selectedArgs || []}
                        onChange={handleArgsChange}
                    />
                )}
            </div>
            <div>
                {getColors()}
            </div>
        </div>
    );
};

export default ColorPicker;
