import React from "react";
import { css, jsx } from '@emotion/react';
// Types
import { ColorPaletteAsArray } from "./types";
// Components
import Colors from './colors';
/** @jsx jsx */

interface Props {
  palette: ColorPaletteAsArray[]
}

const Palette = (props: Props) => {
  const colors = props.palette.map((colors, i) => (
    <>
      <div css={css`
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        font-size: 1.1em;
        padding-right: .5em;
        text-transform: capitalize;
        border-bottom: 1px solid #eee;
      `}>
        {colors.label || 'Unnamed'}
      </div>
      <Colors
        colors={colors}
        key={`Colors_${colors.label}_${i}`}
      />
    </>
  ))

  return (
    <div css={css`
      display: grid;
      grid-template-columns: minmax(70px, min-content) auto;
      grid-row-gap: 5px;
    `}>
      {colors}
    </div>
  )
}

export default Palette
