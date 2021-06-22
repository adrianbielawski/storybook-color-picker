import React from "react";
import { css, jsx } from '@emotion/react'
/** @jsx jsx */

type Props = {
    shade: [string, string],
    coppied: boolean,
};

const ShadeTooltip = (props: Props) => {

    return (
        <div
            css={css`
                padding: 1em;
            `}
        >
            {props.coppied
                ? 'Coppied'
                : `${props.shade[0]}: ${props.shade[1]}`
            }
        </div>
    )
};

export default ShadeTooltip;