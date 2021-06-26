import React from "react";
import { css, jsx } from '@emotion/react';
import { ShadeType } from "./colorPicker";
/** @jsx jsx */

type Props = {
    shade: ShadeType,
    copied: boolean,
};

const ShadeTooltip = (props: Props) => (
    <div
        css={css`
            padding: .2em .5em;
            border-radius: .3em;
            background-color: ${props.shade.value};
        `}
    >
        <p
            css={css`
                white-space: nowrap;
                font-size: 1.2em;
                line-height: 0;
                color: ${props.shade.value};
                filter: saturate(0) grayscale(1) brightness(1) contrast(100000%) invert(1);
            `}
        >
            {props.copied
                ? 'Copied'
                : `${props.shade.label}: ${props.shade.value}`
            }
        </p>
    </div>
);

export default ShadeTooltip;