/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FC } from 'react'
import { useTheme } from '../../hooks'

type Props = {
  label?: string
  checked: boolean
  onClick?: () => void
}

const CheckBox: FC<Props> = ({ label, checked, onClick }) => {
  const { theme } = useTheme()

  return (
    <div
      onClick={onClick}
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
          border: ${`1px solid ${theme.border.secondary}`};
          border-radius: 0.2em;
          width: 1.3em;
          height: 1.3em;
          margin-right: 0.5em;
        `}
      >
        <FontAwesomeIcon
          icon={faCheck}
          css={css`
            path {
              color: ${checked ? `${theme.text.primary}` : 'transparent'};
            }
          `}
        />
      </div>
      {label && (
        <p
          css={css`
            font-size: 1.1em;
            line-height: 1em;
            margin: 0;
            white-space: nowrap;
          `}
        >
          {label}
        </p>
      )}
    </div>
  )
}

export default CheckBox
