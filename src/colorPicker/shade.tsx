import React, { useEffect, useState, useCallback } from 'react'
import { css, jsx } from '@emotion/react'
import { useArgs, useAddonState, useStorybookState, Args } from '@storybook/api'
// Utils
import copy from 'copy-to-clipboard'
import { ADDON_ID } from '../constants'
// Types
import { AddonState, TransformedShadeType } from './types'
// Components
import ShadeTooltip from './shadeTooltip'
import { usePopperTooltip } from 'react-popper-tooltip'
import 'react-popper-tooltip/dist/styles.css'
/** @jsx jsx */

type Props = {
  shade: TransformedShadeType
}

const Shade = (props: Props) => {
  const [_, updateArgs] = useArgs()
  const state = useStorybookState()
  const [addonState] = useAddonState<AddonState>(ADDON_ID)
  const [copied, setCopied] = useState(false)
  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip({ placement: 'top' })

  const storyId = state.storyId
  const storyState = addonState?.storyStates?.[storyId]

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>

    if (copied) {
      timeout = setTimeout(() => {
        setCopied(false)
      }, 750)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [copied])

  const handleClick = useCallback(() => {
    const newArgs: Args = {}

    storyState.selectedControls.forEach(control => {
      newArgs[control] = props.shade.value
    })

    updateArgs(newArgs)

    if (storyState.copyOnClick) {
      setCopied(true)
      copy(props.shade.value)
    }
  }, [storyState.selectedControls, storyState.copyOnClick])

  return (
    <div>
      <div
        onClick={handleClick}
        ref={setTriggerRef}
        css={css`
          width: 1.5em;
          height: 1.5em;
          margin: 0.3em;
          border: 1px solid #ddd;
          background-color: ${props.shade.value};
          &:hover {
            cursor: copy;
            > * {
              display: block;
            }
          }
        `}
      ></div>
      {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({ className: 'tooltip-container' })}
          css={css`
            background: #fff;
            border-radius: 5px;
            border: none;
            box-shadow: 0px 0px 4px 1px #ddd;
          `}
        >
          <div {...getArrowProps({ className: 'tooltip-arrow' })} />
          <ShadeTooltip shade={props.shade} copied={copied} />
        </div>
      )}
    </div>
  )
}

export default Shade
