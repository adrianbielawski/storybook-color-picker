import React from "react";
import { useAddonState } from '@storybook/api';
import { css, jsx } from '@emotion/react';
// Constants
import { ADDON_ID } from "../../constants";
// Types
import { AddonState, PaletteObj } from "../types";
/** @jsx jsx */

type Props = {
    item: PaletteObj,
    index: number,
};

const Palette = (props: Props) => {
    const [addonState] = useAddonState<AddonState>(ADDON_ID)

    if (!props.item.palette) {
        return null
    }

    const backgroundColor = addonState?.currentPalette === props.index ? '#eee' : '#fff'

    return (
        <p
            css={css`
                margin: 0;
                transition: transform .25s;
                border-bottom: 1px solid #eee;
                padding: .25em 1em;
                font-size: 1.1em;
                background-color: ${backgroundColor};

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
