import React from "react";
import { css, jsx } from '@emotion/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
/** @jsx jsx */

type Props = {
    label?: string,
    checked: boolean,
    onClick?: () => void,
}

const CheckBox = (props: Props) => (
    <div
        onClick={props.onClick}
        css={css`
            display: flex;
            align-items: center;

            &:hover {
                cursor: pointer;
            }
        `}
    >
        <div
            css={css`
                display: flex;
                justify-content: center;
                align-items: center;
                border: 1px solid #777;
                border-radius: .2em;
                width: 1.3em;
                height: 1.3em;
                margin-right: .5em;
            `}
        >
            {props.checked && (
                <FontAwesomeIcon icon={faCheck} color="#777" />
            )}
        </div>
        {props.label && (
            <p
                css={css`
                    font-size: 1.1em;
                    line-height: 1em;
                    margin: 0;
                    color: #000;
                    white-space: nowrap;
                `}
            >
                {props.label}
            </p>
        )}
    </div>
);

export default CheckBox;
