import React, { useCallback, useState } from "react";
import { useParameter } from '@storybook/api';
import { css, jsx } from '@emotion/react';
import { transformPalette } from "../utils/utils";
import Colors from './colors';
import PalettesList from "./palettesList/palettesList";
import { ColorPalettes } from "./types";
/** @jsx jsx */

const ColorPicker = () => {
    const colorPalettes: ColorPalettes = useParameter('colorPalettes');
    const [current, setCurrent] = useState(colorPalettes.default);

    const handlePaletteChange = useCallback(
        (newCurrent: number) => {
            setCurrent(newCurrent)
        },
        [],
    )

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
            <PalettesList
                palettes={colorPalettes.palettes}
                current={current}
                onChange={handlePaletteChange}    
            />
            <div>
                {getColors()}
            </div>
        </div>
    );
};

export default ColorPicker;
