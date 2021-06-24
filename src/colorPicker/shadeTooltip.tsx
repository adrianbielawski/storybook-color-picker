import React from "react";
import { css, jsx } from '@emotion/react';
/** @jsx jsx */

type Props = {
    shade: [string, string],
    copied: boolean,
};

const ShadeTooltip = (props: Props) => (
    <div
        css={css`
            padding: .2em .5em;
            border-radius: .3em;
            background-color: ${props.shade[1]};
        `}
    >
        <p
            css={css`
                white-space: nowrap;
                font-size: 1.2em;
                line-height: 0;
                color: ${props.shade[1]};
                filter: saturate(0) grayscale(1) brightness(1) contrast(100000%) invert(1);
            `}
        >
            {props.copied
                ? 'Copied'
                : `${props.shade[0]}: ${props.shade[1]}`
            }
        </p>
    </div>
);

export default ShadeTooltip;