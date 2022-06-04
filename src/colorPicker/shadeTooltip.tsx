/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { FC } from 'react'
import { TransformedShadeType } from './types'

type Props = {
  shade: TransformedShadeType
  copied: boolean
}

const ShadeTooltip: FC<Props> = ({ shade, copied }) => {
  const { value, label, textColor } = shade

  const text = label ? `${label}: ${value}` : value

  return (
    <div
      css={css`
        padding: 0.2em 0.5em;
        border-radius: 0.3em;
        background-color: ${value};
      `}
    >
      <p
        css={css`
          white-space: nowrap;
          font-size: 1.2em;
          line-height: 0;
          color: ${textColor};
        `}
      >
        {copied ? 'Copied' : text}
      </p>
    </div>
  )
}

export default ShadeTooltip
