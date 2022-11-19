import React from 'react';

import { Button } from './Button';

export default {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
    textColor: { control: 'color' },
  },
  parameters: {
    colorPicker: {
      primaryPalette: 'Grayscale palette',
      theme: 'light'
    }
  }
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Button',
  backgroundColor: '#ccc',
  textColor: '#333',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button',
};

Secondary.parameters = {
  colorPicker: {
    primaryPalette: 'Colorful palette',
    applyColorTo: ['label'],
    disableDefaultPalettes: true,
    theme: 'dark'
  }
}

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button',
};
