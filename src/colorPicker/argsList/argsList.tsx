/** @jsx jsx */
import { useCallback } from 'react'
import { css, jsx } from '@emotion/react'
// Utils
import pluralize from 'pluralize'
// Components
import Dropdown from '../dropdown/dropdown'
import Arg from './arg'

type Props = {
  args: string[]
  selected: string[]
  onChange: (newAgr: string[]) => void
}

const ArgsList = (props: Props) => {
  const handleChange = useCallback(
    (item: string, i: number) => {
      const selected = props.selected
      const index = selected.findIndex((a) => a === item)
      const newArgs = [...selected]

      if (index >= 0) {
        newArgs.splice(index, 1)
      } else {
        newArgs.push(item)
      }
      props.onChange(newArgs)
    },
    [props.onChange]
  )

  const label =
    props.selected.length > 0
      ? `Apply to ${pluralize('control', props.selected.length, true)}`
      : 'Select controls'

  const itemProps = {
    selected: props.selected,
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
        items={props.args}
        itemProps={itemProps}
        itemComponent={Arg}
        onItemClick={handleChange}
      />
    </div>
  )
}

export default ArgsList
