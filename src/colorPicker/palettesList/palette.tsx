/** @jsx jsx */
import { css, jsx } from '@emotion/react'
// Types
import { StatePalette } from '../types'

type Props = {
  item: StatePalette
  itemProps: {
    current: number
  }
  index: number
}

const Palette = (props: Props) => {
  if (!props.item.palette) {
    return null
  }

  const backgroundColor =
    props.itemProps.current === props.index ? '#eee' : '#fff'

  return (
    <p
      css={css`
        margin: 0;
        transition: transform 0.25s;
        border-bottom: 1px solid #eee;
        padding: 0.25em 1em;
        font-size: 1.1em;
        background-color: ${backgroundColor};
        white-space: nowrap;

        &:hover {
          cursor: pointer;
          background-color: #f5f5f5;
          border-bottom: 1px solid #f5f5f5;
        }
      `}
    >
      {props.item.name || `Palette No${props.index + 1}`}
    </p>
  )
}

export default Palette
