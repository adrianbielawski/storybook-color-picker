import React from 'react'
import { css, jsx } from '@emotion/react'
// Components
import CheckBox from '../checkBox/checkBox'
/** @jsx jsx */

type Props = {
  item: string
  itemProps: {
    selected: string[]
  }
  index: number
}

const Arg = (props: Props) => {
  const isSelected = props.itemProps.selected.includes(props.item)

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
      <CheckBox label={props.item} checked={isSelected} />
    </div>
  )
}

export default Arg
