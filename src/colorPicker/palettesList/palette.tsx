/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { FC } from 'react'
import { useTheme } from '../../hooks'
import { StatePalette } from '../types'

type Props = {
  item: StatePalette
  itemProps: {
    current: number
  }
  index: number
}

const Palette: FC<Props> = ({ item, itemProps, index }) => {
  const { theme } = useTheme()

  if (!item.palette) {
    return null
  }

  const color =
    itemProps.current === index ? theme.text.selected : theme.text.primary

  return (
    <p
      css={css`
        margin: 0;
        font-size: 1.1em;
        white-space: nowrap;
        color: ${color};
      `}
    >
      {item.name || `Palette No${index + 1}`}
    </p>
  )
}

export default Palette
