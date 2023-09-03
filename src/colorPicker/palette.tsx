/** @jsx jsx */
import { FC, Fragment, useMemo } from 'react'
import { css, jsx } from '@emotion/react'
import { TransformedColorPalette } from './types'
import Colors from './colors'
import { useTheme } from '../hooks'

interface Props {
  palette: TransformedColorPalette[]
}

const Palette: FC<Props> = ({ palette }) => {
  const { theme } = useTheme()

  const colors = useMemo(
    () =>
      palette.map((c, i) => (
        <Fragment key={`Colors_${c.label}_${i}`}>
          <p
            css={css`
              display: flex;
              flex-wrap: wrap;
              align-items: center;
              font-size: 1.1em;
              padding-right: 0.5em;
              margin: 0;
              text-transform: capitalize;
              border-bottom: ${`1px solid  ${theme.background.tertiary}`};
            `}
          >
            {c.label || 'Unnamed'}
          </p>
          <Colors colors={c} />
        </Fragment>
      )),
    [palette, theme],
  )

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
