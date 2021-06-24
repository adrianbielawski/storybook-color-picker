import React, { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { css, jsx } from '@emotion/react';
import { usePopperTooltip } from 'react-popper-tooltip';
import 'react-popper-tooltip/dist/styles.css';
import ShadeTooltip from "./shadeTooltip";
/** @jsx jsx */

type ColorType = {
    shade: [string, string],
};

const Shade = (props: ColorType) => {
    const [copied, setCopied] = useState(false);
    const {
        getArrowProps,
        getTooltipProps,
        setTooltipRef,
        setTriggerRef,
        visible,
    } = usePopperTooltip({ placement: 'top' });

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
            <div>
                <div
                    onClick={handleClick}
                    ref={setTriggerRef}
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
                </div>
                {visible && (
                    <div
                        ref={setTooltipRef}
                        {...getTooltipProps({ className: 'tooltip-container' })}
                        css={css`
                            background: #fff;
                            border-radius: 5px;
                            border: none;
                            box-shadow: 0px 0px 4px 1px #ddd;
                        `}
                    >
                        <div {...getArrowProps({ className: 'tooltip-arrow' })} />
                        <ShadeTooltip
                            shade={props.shade}
                            copied={copied}
                        />
                    </div>
                )}
            </div>
        </CopyToClipboard>
    );
};

export default Shade;