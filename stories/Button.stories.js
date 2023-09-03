import { Button } from './Button'

const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    colorPicker: {
      primaryPalette: 'Grayscale palette',
      theme: 'auto',
    },
  },
  argTypes: {
    backgroundColor: { control: 'color' },
    textColor: { control: 'color' },
  },
  args: {
    primary: true,
    label: 'Button',
    backgroundColor: '#ccc',
    textColor: '#333',
  },
}

export const Primary = { args: {} }

export const Secondary = {
  ...Primary,
  args: {
    label: 'Button',
  },
  parameters: {
    colorPicker: {
      primaryPalette: 'Colorful palette',
      applyColorTo: ['label'],
      disableDefaultPalettes: true,
      theme: 'dark',
    },
  },
}

export const Large = {
  ...Primary,
  args: {
    size: 'large',
    label: 'Button',
  },
}

export const Small = {
  ...Primary,
  args: {
    size: 'small',
    label: 'Button',
  },
}

export default meta
