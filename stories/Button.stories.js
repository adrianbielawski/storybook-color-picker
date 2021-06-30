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
    defaultColorPalette: 'Greyscale palette',
    applyColorTo: [
      'backgroundColor',
    ]
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

Primary.parameters = {
  applyColorTo: [
    'textColor'
  ]
}

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button',
};

Secondary.parameters = {
  defaultColorPalette: 'Colorfull palette',
  applyColorTo: [
    'backgroundColor',
    'textColor'
  ]
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
