/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { FC } from 'react'
// Components
import CheckBox from '../checkBox/checkBox'

type Props = {
  item: string
  itemProps: {
    selected: string[]
  }
}

const Arg: FC<Props> = ({ item, itemProps }) => {
  const isSelected = itemProps.selected.includes(item)

  return (
    <div
      css={css`
        padding: 0.5em;
        border-bottom: 1px solid #eee;

        &:hover {
          cursor: pointer;
          background-color: #f5f5f5;
          border-bottom: 1px solid #f5f5f5;
        }
      `}
    >
      <CheckBox label={item} checked={isSelected} />
    </div>
  )
}

export default Arg
