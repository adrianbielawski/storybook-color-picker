import React, { ReactNode } from 'react';
import { css, jsx } from '@emotion/react';
/** @jsx jsx */

type Props = {
    children: ReactNode,
};

const Tooltip = (props: Props) => (
    <div css={css`
        position: fixed;
        transform: translate(calc(.75em - 50%), calc(-.5em - 100%));
        display: none;
        background: #fff;
        border-radius: 5px;
        box-shadow: 0px 0px 4px 1px #ccc;
        z-index: 1;
    `}>
        {props.children}
    </div>
);

export default Tooltip;