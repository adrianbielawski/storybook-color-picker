import React, { FC } from 'react'
import CheckBox from '../checkBox/checkBox'

type Props = {
  item: string
  itemProps: {
    selected: string[]
  }
}

const Arg: FC<Props> = ({ item, itemProps }) => {
  const isSelected = itemProps.selected.includes(item)

  return <CheckBox label={item} checked={isSelected} />
}

export default Arg
