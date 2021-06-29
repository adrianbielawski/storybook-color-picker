import React from "react";
import { css, jsx } from '@emotion/react'
import { ColorPaletteAsArray } from "./types";
import Shade from "./shade";
/** @jsx jsx */

type Props = {
    colors: ColorPaletteAsArray,
};

const Colors = (props: Props) => {
    const getShades = () => props.colors.values.map((shade, i) => (
        <Shade
            shade={shade}
            key={`Shade_${shade.value}_${i}`}
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
                    text-transform: capitalize;
                `}
            >
                {props.colors.label || 'Unnamed'}
            </div>
            <div
                css={css`
                    display: flex;
                    flex-wrap: wrap;
                `}
            >
                {getShades()}
            </div>
        </div>
    )
};

export default Colors;