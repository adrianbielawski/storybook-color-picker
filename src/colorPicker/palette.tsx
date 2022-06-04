/** @jsx jsx */
import { FC, Fragment } from 'react'
import { css, jsx } from '@emotion/react'
// Types
import { TransformedColorPalette } from './types'
// Components
import Colors from './colors'

interface Props {
  palette: TransformedColorPalette[]
}

const Palette: FC<Props> = ({ palette }) => {
  const colors = palette.map((c, i) => (
    <Fragment key={`Colors_${c.label}_${i}`}>
      <div
        css={css`
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          font-size: 1.1em;
          padding-right: 0.5em;
          text-transform: capitalize;
          border-bottom: 1px solid #eee;
        `}
      >
        {c.label || 'Unnamed'}
      </div>
      <Colors colors={c} />
    </Fragment>
  ))

  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: minmax(70px, min-content) auto;
        grid-row-gap: 5px;
      `}
    >
      {colors}
    </div>
  )
}

export default Palette
