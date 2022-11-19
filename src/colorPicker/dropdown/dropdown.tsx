/** @jsx jsx */
import {
  ElementType,
  useCallback,
  useEffect,
  useState,
  MouseEvent,
  FC,
} from 'react'
import { css, jsx } from '@emotion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useTheme, useOutsideClick } from '../../hooks'
import List from './list'

type Props<I> = {
  label: string
  items: I[]
  itemProps?: Record<string, unknown>
  itemComponent: ElementType<I>
  closeOnItemClick?: boolean
  renderList?: '>1' | 'always'
  onLabelClick?: (active: boolean) => void
  onItemClick: (item: I, index: number) => void
}

const Dropdown: FC<Props<any>> = ({
  label,
  items,
  itemProps,
  itemComponent,
  closeOnItemClick,
  renderList,
  onLabelClick,
  onItemClick,
}) => {
  const { theme } = useTheme()
  const [active, setActive] = useState(false)

  useEffect(() => {
    const colorPicker = document.getElementById('color-picker')

    const handleScroll = () => {
      setActive(false)
    }

    if (colorPicker && active) {
      colorPicker.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (colorPicker) {
        colorPicker.removeEventListener('scroll', handleScroll)
      }
    }
  }, [active])

  const closeList = useCallback(() => {
    setActive(false)
  }, [])

  const wrapperRef = useOutsideClick(closeList)

  const toggleActive = useCallback(
    (e: MouseEvent) => {
      e.preventDefault()
      setActive(!active)
      onLabelClick?.(!active)
    },
    [active, onLabelClick]
  )

  const handleItemClick = useCallback(
    (item: any, index: number) => {
      if (closeOnItemClick) {
        closeList()
      }
      onItemClick(item, index)
    },
    [closeOnItemClick, closeList, onItemClick]
  )

  const showList =
    renderList === 'always' || (renderList === '>1' && items.length > 1)

  return (
    <div
      ref={wrapperRef}
      css={css`
        display: inline-block;
      `}
      data-testid="dropdown"
    >
      <button
        data-testid="dropdownButton"
        onClick={toggleActive}
        css={css`
          background-color: transparent;
          border: none;
          font-size: 1.1em;
          padding: 0;

          ${renderList &&
          `&:hover {
            cursor: pointer;
          }`}
        `}
      >
        <p
          data-testid="dropdownLabel"
          css={css`
            display: inline;
            margin-right: 0.5em;
          `}
        >
          {label}
        </p>
        {showList && (
          <FontAwesomeIcon
            icon={faChevronDown}
            color={theme.text.primary}
            data-testid="dropdownChevron"
          />
        )}
      </button>
      {showList && (
        <List
          active={active}
          items={items}
          itemProps={itemProps}
          itemComponent={itemComponent}
          onItemClick={handleItemClick}
          testId="dropdownList"
        />
      )}
    </div>
  )
}

Dropdown.defaultProps = {
  label: null,
  items: null,
  itemComponent: null,
  closeOnItemClick: false,
  renderList: 'always',
  onLabelClick: () => {},
  onItemClick: () => {},
}

export default Dropdown
