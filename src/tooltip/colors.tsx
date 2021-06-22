import React from "react";
import { css, jsx } from '@emotion/react'
import { capitalize } from "../utils";
import { Shades } from "./tooltip";
import Shade from "./shade";
/** @jsx jsx */

type ColorsType = {
    colors: [string, Shades],
};

const Colors = (props: ColorsType) => {
    const getColors = (shades: Shades) => Object.entries(shades).map(shade => (
        <Shade
            shade={shade} 
            key={`Color_${shade[1]}`}
        />
    ));

    return (
        <div
            css={css`
                display: flex;
                align-items: center;
            `}
        >
            <div
                css={css`
                    font-weight: 700;
                    margin-right: .5em;
                `}
            >
                {capitalize(props.colors[0])}
            </div>
            {getColors(props.colors[1])}
        </div>
    )
};

export default Colors;