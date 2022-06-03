import {
  InvalidPalette,
  PaletteAsArray,
  PaletteAsObject,
  StatePalette,
} from 'src/colorPicker/types'

export const automation = (name: string) => `[data-automation="${name}"]`

export const lightArray = {
  label: 'light',
  values: [
    {
      label: '100',
      value: '#fff',
    },
    {
      label: '200',
      value: '#eee',
    },
  ],
}

export const transformedLightArray = {
  label: 'light',
  values: [
    {
      label: '100',
      value: '#fff',
      textColor: '#000000',
    },
    {
      label: '200',
      value: '#eee',
      textColor: '#000000',
    },
  ],
}

export const darkArray = {
  label: 'dark',
  values: [
    {
      label: '100',
      value: '#000',
    },
    {
      label: '200',
      value: '#111',
    },
  ],
}

export const transformedDarkArray = {
  label: 'dark',
  values: [
    {
      label: '100',
      value: '#000',
      textColor: '#FFFFFF',
    },
    {
      label: '200',
      value: '#111',
      textColor: '#FFFFFF',
    },
  ],
}

export const whiteArray = {
  label: 'white',
  values: [
    {
      label: 'white',
      value: '#fff',
    },
  ],
}

export const transformedWhiteArray = {
  label: 'white',
  values: [
    {
      label: 'white',
      value: '#fff',
      textColor: '#000000',
    },
  ],
}

export const paletteAsArray: PaletteAsArray = {
  name: 'foo',
  palette: [lightArray, darkArray, whiteArray],
}

export const invalidPaletteAsArray: InvalidPalette[] = [
  {
    name: 'foo',
    invalidColors: [lightArray],
  },
]

export const statePalette: StatePalette = {
  name: 'foo',
  palette: [transformedLightArray, transformedDarkArray, transformedWhiteArray],
}

export const lightObject = {
  light: {
    100: '#fff',
    200: '#eee',
  },
}

export const darkObject = {
  dark: {
    100: '#000',
    200: '#111',
  },
}

export const whiteObject = { white: '#fff' }

export const paletteAsObject: PaletteAsObject = {
  name: 'bar',
  palette: {
    ...lightObject,
    ...darkObject,
    ...whiteObject,
  },
}

export const argTypes = {
  backgroundColor: {
    name: 'backgroundColor',
    control: {
      type: 'color',
    },
    type: {
      name: 'string',
    },
  },
  label: {
    name: 'label',
    control: {
      type: 'text',
    },
    type: {
      name: 'string',
    },
  },
  disabled: {
    name: 'disabled',
    control: {
      type: 'boolean',
    },
    type: {
      name: 'boolean',
    },
  },
}
