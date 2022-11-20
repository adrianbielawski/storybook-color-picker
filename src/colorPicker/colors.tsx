/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { TransformedColorPalette } from './types'
import Shade from './shade'
import { FC, useMemo } from 'react'
import { useTheme } from '../hooks'

type Props = {
  colors: TransformedColorPalette
}

const Colors: FC<Props> = ({ colors }) => {
  const { theme } = useTheme()

  const shades = useMemo(
    () =>
      colors.values.map((shade, i) => (
        <Shade shade={shade} key={`Shade_${shade.value}_${i}`} />
      )),
    [colors]
  )

  return (
    <div
      css={css`
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        height: 100%;
        border-bottom: ${`1px solid  ${theme.border.tertiary}`};
      `}
    >
      {shades}
    </div>
  )
}

export default Colors
