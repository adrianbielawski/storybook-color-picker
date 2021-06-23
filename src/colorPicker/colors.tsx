import React from "react";
import { css, jsx } from '@emotion/react'
import { capitalize } from "../utils";
import { Shades } from "./colorPicker";
import Shade from "./shade";
/** @jsx jsx */

type ColorsType = {
    colors: [string, Shades | string],
};

const Colors = (props: ColorsType) => {
    const getColors = (shades: Shades | string) => {
        const isString = (typeof shades) === 'string';

        if (isString) {
            return (
                <Shade
                    shade={[props.colors[0], (shades as string)]}
                    key={`Color_${shades}`}
                />
            )
        }

        return Object.entries(shades).map(shade => (
            <Shade
                shade={shade}
                key={`Color_${shade[1]}`}
            />
        ));
    }

    return (
        <div
            css={css`
                display: flex;
                align-items: center;
                border-bottom: 1px solid #eee;
                margin-top: .5em;
            `}
        >
            <div
                css={css`
                    flex-shrink: 0;
                    font-size: 1.1em;
                    width: 70px;
                    margin-right: .5em;
                    overflow-wrap: anywhere;
                `}
            >
                {capitalize(props.colors[0])}
            </div>
            <div
                css={css`
                    display: flex;
                    flex-wrap: wrap;
                `}
            >
                {getColors(props.colors[1])}
            </div>
        </div>
    )
};

export default Colors;