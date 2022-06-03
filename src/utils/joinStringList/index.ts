const joinStringList = (strings: string[], limit?: number) => {
  const count = strings.length

  if (limit === 0) {
    return count.toString()
  }
  const stringArray = strings.flatMap((string, i) => {
    const getLastStringFromLimit = () => {
      if (limit === undefined || limit > count) {
        return
      }

      return limit - 1
    }

    const lastString = getLastStringFromLimit() ?? count - 1

    if (limit && i + 1 > limit) {
      return ''
    }

    if (lastString === 0 && count === 1) {
      return string
    }

    if (i < lastString - 1) {
      return `${string}, `
    }

    if (i === lastString) {
      const otherCount = limit ? count - limit : 0
      const otherText = otherCount === 1 ? 'other' : 'others'
      const returnString = `${string} and ${otherCount} ${otherText}`

      if (lastString === 0) {
        return returnString
      }

      if (otherCount > 0) {
        return ', ' + returnString
      }

      return ` and ${string}`
    }

    return string
  })

  return stringArray.join('')
}

export default joinStringList
