import React from "react";
import { useGlobals } from '@storybook/api';
import { css, jsx } from '@emotion/react';
// Components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
/** @jsx jsx */

type Props = {
    item: string,
    index: number,
};

const Arg = (props: Props) => {
    const [globals] = useGlobals();
    const selectedArgs = globals.selectedArgs || [];
    const isSelected = selectedArgs.includes(props.item);

    return (
        <div
            css={css`
                display: flex;
                align-items: center;
            `}
        >
            <p
                css={css`
                    margin: 0;
                    border-bottom: 1px solid #eee;
                    padding: .25em .5em;
                    font-size: 1.1em;
                    width: 100%;
                    white-space: nowrap;
                    text-align: left;

                    &:hover {
                        cursor: pointer;
                        background-color: #f5f5f5;
                        border-bottom: 1px solid #f5f5f5;
                    }
                `}
            >
                <span
                    css={css`
                        display: inline-block;
                        width: 1.5em;
                    `}
                >
                    {isSelected && (
                        <FontAwesomeIcon icon={faCheck} color="#777" />
                    )}
                </span>
                    {props.item}
            </p>
        </div>
    )
};

export default Arg;