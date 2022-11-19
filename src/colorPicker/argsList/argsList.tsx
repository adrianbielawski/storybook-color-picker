/** @jsx jsx */
import { FC, useCallback } from 'react'
import { css, jsx } from '@emotion/react'
import pluralize from 'pluralize'
import Dropdown from '../dropdown/dropdown'
import Arg from './arg'

type Props = {
  args: string[]
  selected: string[]
  onChange: (newAgr: string[]) => void
}

const ArgsList: FC<Props> = ({ args, selected, onChange }) => {
  const handleChange = useCallback(
    (item: string) => {
      const index = selected.findIndex((a) => a === item)
      const newArgs = [...selected]

      if (index >= 0) {
        newArgs.splice(index, 1)
      } else {
        newArgs.push(item)
      }
      onChange(newArgs)
    },
    [selected, onChange]
  )

  const label =
    selected.length > 0
      ? `Apply to ${pluralize('control', selected.length, true)}`
      : 'Select controls'

  const itemProps = {
    selected,
  }

  return (
    <div
      css={css`
        min-width: 13em;
        display: flex;
        justify-content: center;
        @media (max-width: 800px) {
          justify-content: unset;
        }
      `}
    >
      <Dropdown
        label={label}
        items={args}
        itemProps={itemProps}
        itemComponent={Arg}
        onItemClick={handleChange}
      />
    </div>
  )
}

export default ArgsList
