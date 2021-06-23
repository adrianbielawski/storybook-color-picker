import React from "react";
import { useParameter } from '@storybook/api';
import { css, jsx } from '@emotion/react';
import Colors from './colors';
/** @jsx jsx */

export type Shades = Record<string, string>;
export type ColorsPalette = Record<string, Shades>;

const ColorPicker = () => {
    const colorPalette: ColorsPalette = useParameter('colorPalette');

    const getColorPalettes = () => (
        Object.entries(colorPalette).map(colors => (
            <Colors
                colors={colors}
                key={`Shades_${colors[0]}`}
            />
        ))
    );

    return (
        <div css={css`padding: 1em;`}>
            <div
                css={css`
                    font-size: 1.1em;
                    font-weight: 700;
                    margin-bottom: 1em;
                    text-align: center;
                `}
            >
                Click on color to copy to clipboard
            </div>
            {getColorPalettes()}
        </div>
    );
};

export default ColorPicker;
