import React, { useEffect, useState, useCallback } from "react";
import { css, jsx } from '@emotion/react';
import { useArgs, useGlobals } from '@storybook/api';
// Types
import { ShadeType } from "./types";
// Components
import ShadeTooltip from "./shadeTooltip";
import CopyToClipboard from "react-copy-to-clipboard";
import { usePopperTooltip } from 'react-popper-tooltip';
import 'react-popper-tooltip/dist/styles.css';
/** @jsx jsx */

type Props = {
    shade: ShadeType,
};

const Shade = (props: Props) => {
    const [_, updateArgs] = useArgs();
    const [globals] = useGlobals();

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
            }, 750);
        }

        return () => {
            clearTimeout(timeout)
        }
    }, [copied])

    const handleClick = useCallback(() => {
        const newArgs: Record<string, string> = {};

        (globals.selectedArgs as string[]).map(arg => {
            newArgs[arg] = props.shade.value;
        });

        updateArgs(newArgs)
        setCopied(true);
    }, [globals.selectedArgs]);

    return (
        <CopyToClipboard text={props.shade.value}>
            <div>
                <div
                    onClick={handleClick}
                    ref={setTriggerRef}
                    css={css`
                        width: 1.5em;
                        height: 1.5em;
                        margin: .3em;
                        border: 1px solid #ddd;
                        background-color: ${props.shade.value};
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