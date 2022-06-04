/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { FC } from 'react'
// Types
import { StatePalette } from '../types'

type Props = {
  item: StatePalette
  itemProps: {
    current: number
  }
  index: number
}

const Palette: FC<Props> = ({ item, itemProps, index }) => {
  if (!item.palette) {
    return null
  }

  const backgroundColor = itemProps.current === index ? '#eee' : '#fff'

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
      {item.name || `Palette No${index + 1}`}
    </p>
  )
}

export default Palette
