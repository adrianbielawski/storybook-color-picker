import React from "react";
import { css, jsx } from '@emotion/react'
import { capitalize } from "../utils";
import { ColorPaletteAsArray, ShadeType } from "./ColorPicker";
import Shade from "./Shade";
/** @jsx jsx */

type ColorsType = {
    colors: ColorPaletteAsArray,
};

const Colors = (props: ColorsType) => {
    const getColors = (shades: ShadeType[]) => shades.map(shade => (
        <Shade
            shade={shade}
            key={`Color_${shade.value}`}
        />
    ));

    return (
        <div
            css={css`
                display: flex;
                align-items: center;
                border-bottom: 1px solid #eee;
                margin-top: .5em;
            `}
        >
            <div
                css={css`
                    flex-shrink: 0;
                    font-size: 1.1em;
                    width: 70px;
                    margin-right: .5em;
                    overflow-wrap: anywhere;
                `}
            >
                {capitalize(props.colors.label)}
            </div>
            <div
                css={css`
                    display: flex;
                    flex-wrap: wrap;
                `}
            >
                {getColors(props.colors.values)}
            </div>
        </div>
    )
};

export default Colors;