import React from "react";
import { css, jsx } from '@emotion/react';
// Types
import { PaletteObj } from "../types";
/** @jsx jsx */

type Props = {
    item: PaletteObj,
    index: number,
};

const Palette = (props: Props) => {
    if (!props.item.palette) {
        return null
    }

    return (
        <p
            css={css`
                margin: 0;
                transition: transform .25s;
                border-bottom: 1px solid #eee;
                padding: .25em 1em;
                font-size: 1.1em;

                &:hover {
                    cursor: pointer;
                    background-color: #f5f5f5;
                    border-bottom: 1px solid #f5f5f5;
                }
            `}
        >
            {props.item.name || `Palette No${props.index + 1}`}
        </p>
    )
}

export default Palette;
