import React, { useCallback, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { WithTooltip } from "@storybook/components";
import { css, jsx } from '@emotion/react'
import ShadeTooltip from "./shadeTooltip";
/** @jsx jsx */

type ColorType = {
    shade: [string, string],
};

const Shade = (props: ColorType) => {
    const [coppied, setCoppied] = useState(false)

    const handleClick = () => useCallback(
        () => {
            setCoppied(!coppied)
        },
        [coppied],
    )

    return (
        <WithTooltip
            placement="top"
            trigger="hover"
            tooltipShown={true}
            closeOnClick={false}
            tooltip={(
                <ShadeTooltip
                    shade={props.shade}
                    coppied={coppied}
                />
            )}
        >
            <CopyToClipboard
                text={props.shade[1]}
            >
                <div
                    onClick={handleClick}
                    css={css`
                width: 1.5em;
                height: 1.5em;
                margin: .3em;
                border: 1px solid #ddd;
                background-color: ${props.shade[1]};
                transition: transform .2s;
                &:hover {
                    transform: scale(1.2);
                    cursor: copy;
                }
            `}
                ></div>
            </CopyToClipboard>
        </WithTooltip>
    );
};

export default Shade;