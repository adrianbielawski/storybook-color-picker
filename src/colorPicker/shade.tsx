import React, { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { css, jsx } from '@emotion/react';
import ShadeTooltip from "./shadeTooltip";
/** @jsx jsx */

type ColorType = {
    shade: [string, string],
    tooltipPosition?: 'left' | 'right' | 'top' | 'bottom',
};

const Shade = (props: ColorType) => {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>

        if (copied) {
            timeout = setTimeout(() => {
                setCopied(false)
            }, 500);
        }

        return () => {
            clearTimeout(timeout)
        }
    }, [copied])

    const handleClick = () => {
        setCopied(true);
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
                    position: relative;
                    &:hover {
                        cursor: copy;
                        > * {
                            display: block;
                        }
                    }
                `}
            >
                <ShadeTooltip
                    shade={props.shade}
                    copied={copied}
                />
            </div>
        </CopyToClipboard>
    );
};

export default Shade;