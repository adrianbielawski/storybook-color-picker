import { ArgTypes } from '@storybook/api/dist/ts3.9'

export const getColorControls = (
  argTypes: ArgTypes,
  additionalControls?: string[]
) => {
  const argTypesArray = Object.entries(argTypes)

  if (!argTypesArray.length) {
    return
  }

  const filteredArgTypes = argTypesArray.filter(
    (arg) => arg[1].control?.type === 'color'
  )
  const colorControls = filteredArgTypes.map((arg) => arg[0])

  if (additionalControls?.length) {
    const storyControls = argTypesArray.map((arg) => arg[0])
    const filteredAdditional = additionalControls.filter(
      (a) => storyControls.includes(a) && argTypes[a].control?.type === 'text'
    )

    const extendedControls = new Set(colorControls.concat(filteredAdditional))
    return Array.from(extendedControls)
  }

  return colorControls
}
