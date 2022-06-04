import React from 'react'
import Dropdown from './dropdown'
import { fireEvent, render } from '@testing-library/react'

const Item = (props: { item: string; index: number }) => <div>{props.item}</div>

describe('Dropdown', () => {
  const label = 'Label'
  const e = { preventDefault: jest.fn() }

  let onLabelClick: (active: boolean) => void
  let onItemClick: (item: string, index: number) => void

  beforeEach(() => {
    onLabelClick = jest.fn()
    onItemClick = jest.fn()
  })

  it.each([
    [
      'has only one item and renderList === undefined',
      undefined,
      ['first'],
      true,
      true,
    ],
    [
      "has only one item and renderList === '>1'",
      '>1',
      ['first'],
      false,
      false,
    ],
    [
      "has only one item and renderList === 'always'",
      'always',
      ['first'],
      true,
      true,
    ],
    [
      'has more than one item and renderList === undefined',
      undefined,
      ['first', 'second'],
      true,
      true,
    ],
    [
      "has more than one item and renderList === '>1'",
      '>1',
      ['first', 'second'],
      true,
      true,
    ],
    [
      "has more than one item and renderList === 'always'",
      'always',
      ['first', 'second'],
      true,
      true,
    ],
  ])(
    'renders correctly when %s',
    (desc, renderList, items, expectedList, expectedChevron) => {
      const dropdownComponent = (
        <Dropdown
          label={label}
          items={items}
          renderList={renderList as '>1' | 'always'}
          itemComponent={Item}
          onItemClick={onItemClick}
        />
      )
      const { queryByTestId } = render(dropdownComponent)

      const dropdownLabel = queryByTestId('dropdownLabel')
      const dropdownChevron = queryByTestId('dropdownChevron')
      const dropdownList = queryByTestId('dropdownList')

      expect(dropdownLabel.textContent).toBe(label)
      expect(!!dropdownChevron).toBe(expectedChevron)
      expect(!!dropdownList).toBe(expectedList)
    }
  )

  it.each([
    ['', 'defined', true, 1],
    ['do NOT', 'undefined', false, 0],
  ])(
    '%s calls onLabelClick when onLabelClick is %s',
    (desc1, desc2, isCallbackDefined, expectedCallsQty) => {
      const dropdownComponent = (
        <Dropdown
          label={label}
          items={['item']}
          itemComponent={Item}
          onLabelClick={isCallbackDefined ? onLabelClick : undefined}
          onItemClick={onItemClick}
        />
      )

      const { queryByTestId } = render(dropdownComponent)

      const dropdownButton = queryByTestId('dropdownButton')
      const dropdownChevron = queryByTestId('dropdownChevron')
      const dropdownList = queryByTestId('dropdownList')

      fireEvent.click(dropdownButton, e)

      expect(onLabelClick).toHaveBeenCalledTimes(expectedCallsQty)
      if (isCallbackDefined) {
        expect(onLabelClick).toHaveBeenCalledWith(true)
      } else {
        expect(onLabelClick).not.toHaveBeenCalled()
      }
      expect(!!dropdownChevron).toBeTruthy()
      expect(!!dropdownList).toBeTruthy()
    }
  )
})
