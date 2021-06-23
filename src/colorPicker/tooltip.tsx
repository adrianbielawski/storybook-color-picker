import React, { ReactNode } from 'react';
import { css, jsx } from '@emotion/react';
/** @jsx jsx */

type Props = {
    children: ReactNode,
};

const Tooltip = (props: Props) => (
    <div css={css`
        position: absolute;
        bottom: 100%;
        right: 0;
        display: none;
        background: #fff;
        border-radius: 5px;
        box-shadow: 0px 0px 4px 1px #ccc;
        z-index: 10000;
    `}>
        {props.children}
    </div>
);

export default Tooltip;