import React, { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { css, jsx } from '@emotion/react';
import DialogCloud from "./tooltip";
import ShadeTooltip from "./shadeTooltip";
/** @jsx jsx */

type ColorType = {
    shade: [string, string],
};

const Shade = (props: ColorType) => {
    const [coppied, setCoppied] = useState(false);

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>
        
        if (coppied) {
            timeout = setTimeout(() => {
                setCoppied(false)
            }, 500);
        }

        return () => {
            clearTimeout(timeout)
        }
    }, [coppied])

    const handleClick = () => {
        setCoppied(true);
    };

    return (
        <CopyToClipboard text={props.shade[1]}>
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
                        > * {
                            display: block;
                        }
                    }
                `}
            >
                <DialogCloud>
                    <ShadeTooltip
                        shade={props.shade}
                        coppied={coppied}
                    />
                </DialogCloud>
            </div>
        </CopyToClipboard>
    );
};

export default Shade;