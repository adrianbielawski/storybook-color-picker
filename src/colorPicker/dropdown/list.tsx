/** @jsx jsx */
import { ElementType, useCallback } from 'react'
import { css, jsx } from '@emotion/react'
import AnimateHeight from 'react-animate-height'
import { useTheme } from '../../hooks'

export type ListPosition = 'bottom-left' | 'bottom-right'

type Props<I> = {
  active: boolean
  items: I[]
  itemProps: Record<string, unknown>
  itemComponent: ElementType<I>
  onItemClick: (item: I, index: number) => void
  testId: string
}

const List = ({
  active,
  items,
  itemProps,
  itemComponent,
  onItemClick,
  testId,
}: Props<any>) => {
  const { theme, commonTheme } = useTheme()
  const ItemComponent = itemComponent

  const getListItems = useCallback(
    () =>
      items.map((item, i) => {
        const handleClick = () => {
          onItemClick(item, i)
        }

        const backgroundColor =
          itemProps.current === i ? theme.background.selected : 'transparent'

        const backgroundColorHover =
          itemProps.current === i
            ? theme.background.selected
            : theme.background.hover

        return (
          <div
            key={i}
            onClick={handleClick}
            css={css`
              background-color: ${`${backgroundColor}`};
              padding: 0;
              border: none;
              width: 100%;
              display: block;
              padding: 0.5em;
              border-bottom: ${`1px solid ${theme.border.tertiary}`};

              &:hover {
                cursor: pointer;
                background-color: ${backgroundColorHover};
              }

              &:last-of-type {
                border: none;
              }
            `}
          >
            <ItemComponent
              item={item}
              itemProps={itemProps}
              index={i}
              key={i}
            />
          </div>
        )
      }),
    [items, itemProps, theme, ItemComponent, onItemClick],
  )

  return (
    <div
      css={css`
        position: fixed;
      `}
      data-testid={testId}
    >
      <AnimateHeight height={active ? 'auto' : 0}>
        <div
          css={css`
            box-shadow: ${`0px 0px 4px 1px ${theme.shadow.primary}`};
            background-color: ${`${theme.background.secondary}`};
            border-radius: 0.5em;
            margin: 0.25em;
            max-height: 200px;
            overflow-x: hidden;
            overflow-y: auto;
            &::-webkit-scrollbar {
              width: 0.5em;
              height: 0.5em;
            }
            &::-webkit-scrollbar-track {
              background: ${`${commonTheme.scrollBar.track}`};
            }
            &::-webkit-scrollbar-thumb {
              background: ${`${commonTheme.scrollBar.thumb}`};
              border-radius: 0.25em;
              &:hover {
                background-color: ${`${commonTheme.scrollBar.thumbHover}`};
              }
            }
          `}
        >
          {getListItems()}
        </div>
      </AnimateHeight>
    </div>
  )
}

export default List
