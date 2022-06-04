export const getDeprecationMessage = (
  deprecated: string,
  removedIn?: string,
  alternative?: string
) => {
  const message1 = `Color picker warning: ${deprecated} is DEPRECATED`
  const message2 = removedIn ? ` and will be removed in ${removedIn}.` : ''
  const message3 = alternative ? ` Use ${alternative} instead.` : ''

  return message1 + message2 + message3
}

export const deprecationWarning = (message: string) => {
  if (process.env.NODE_ENV === 'production') {
    return
  }

  // eslint-disable-next-line no-console
  console.warn(message)
}

const warnDeprecated = (
  deprecated: string,
  removedIn?: string,
  alternative?: string
) => {
  const message = getDeprecationMessage(deprecated, removedIn, alternative)
  deprecationWarning(message)
}

export default warnDeprecated
