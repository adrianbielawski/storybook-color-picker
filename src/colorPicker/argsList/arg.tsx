import React from "react";
import { useGlobals } from '@storybook/api';
import { css, jsx } from '@emotion/react';
// Components
import CheckBox from "../checkBox/checkBox";
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
                padding: .5em;
                border-bottom: 1px solid #eee;

                &:hover {
                    cursor: pointer;
                    background-color: #f5f5f5;
                    border-bottom: 1px solid #f5f5f5;
                }
            `}
        >
            <CheckBox
                label={props.item}
                checked={isSelected}
            />
        </div>
    )
};

export default Arg;