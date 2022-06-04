/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { TransformedShadeType } from './types'

type Props = {
  shade: TransformedShadeType
  copied: boolean
}

const ShadeTooltip = (props: Props) => {
  const color = props.shade.value
  const label = props.shade.label
  const textColor = props.shade.textColor

  const text = label ? `${label}: ${color}` : color

  return (
    <div
      css={css`
        padding: 0.2em 0.5em;
        border-radius: 0.3em;
        background-color: ${color};
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
        {props.copied ? 'Copied' : text}
      </p>
    </div>
  )
}

export default ShadeTooltip
