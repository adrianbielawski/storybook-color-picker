/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { TransformedColorPalette } from './types'
import Shade from './shade'

type Props = {
  colors: TransformedColorPalette
}

const Colors = (props: Props) => {
  const shades = props.colors.values.map((shade, i) => (
    <Shade shade={shade} key={`Shade_${shade.value}_${i}`} />
  ))

  return (
    <div
      css={css`
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        height: 100%;
        border-bottom: 1px solid #eee;
      `}
    >
      {shades}
    </div>
  )
}

export default Colors
