import React, { FC, useCallback } from 'react'
import { StatePalette } from '../types'
import Dropdown from '../dropdown/dropdown'
import Palette from './palette'

type Props = {
  palettes: StatePalette[]
  current: number
  onChange: (newCurrent: number) => void
}

const PalettesList: FC<Props> = ({ palettes, current, onChange }) => {
  const handleChange = useCallback(
    (item: StatePalette, index: number) => {
      onChange(index)
    },
    [onChange]
  )

  const label = palettes.length > 1 ? palettes[current].name : palettes[0].name

  const itemProps = {
    current,
  }

  return (
    <Dropdown
      label={label || `Palette No${current + 1}`}
      items={palettes}
      itemProps={itemProps}
      itemComponent={Palette}
      closeOnItemClick
      renderList=">1"
      onItemClick={handleChange}
    />
  )
}

export default PalettesList
