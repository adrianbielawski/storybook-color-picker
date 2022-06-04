/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

type Props = {
  label?: string
  checked: boolean
  onClick?: () => void
}

const CheckBox = (props: Props) => (
  <div
    onClick={props.onClick}
    css={css`
      display: flex;
      align-items: center;

      &:hover {
        cursor: pointer;
      }
    `}
  >
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #777;
        border-radius: 0.2em;
        width: 1.3em;
        height: 1.3em;
        margin-right: 0.5em;
      `}
    >
      <FontAwesomeIcon
        icon={faCheck}
        color={props.checked ? '#777' : 'transparent'}
      />
    </div>
    {props.label && (
      <p
        css={css`
          font-size: 1.1em;
          line-height: 1em;
          margin: 0;
          color: #000;
          white-space: nowrap;
        `}
      >
        {props.label}
      </p>
    )}
  </div>
)

export default CheckBox
