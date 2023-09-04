# storybook-color-picker

## Description

A Storybook addon. It allows you to quickly find any color from your custom color palette and set it on component's controls and/or copy to clipboard.

Add one or multiple color palettes and set the primary palette globally, for component or single story.

![storybook-color-picker](./assets/showcase.gif)

## Usage

```
$ npm i -D storybook-color-picker@latest
```

> <span style="font-size: 1.25em; color: steelblue">
>  ℹ️ Storybook support
> </span>
> </br>
> `storybook-color-picker` v4 doesn't support `storybook` v6.
> </br>
> To use `storybook-color-picker` with `storybook` v6, install `storybook-color-picker` v3
>
> ```
> npm i -D storybook-color-picker@3
> ```

### Add to your Storybook

In your `.storybook` folder find `main.js` file and add this addon like below.

```tsx
module.exports = {
  addons: ['storybook-color-picker'],
}
```

### Add palettes

#### Globally

This will add color picker and palettes everywhere in your storybook.

In your `.storybook` folder find `preview.js` file and add your color palette to parameters like below.
Scroll down to find out how your color [palette](#palette) must look like.

```tsx
import yourFirstColorPalette from './yourFirstColorPalette.json';
import yourSecondColorPalette from './yourSecondColorPalette.json';

export const parameters = {
  ...
  colorPicker: {
    primaryPalette: 'Your first palette name', // Name of primary palette for all components and its stories. Optional (fallback to first palette from the palettes array).
    palettes: [
      {
        name: 'Your first palette name', // string
        palette: yourFirstColorPalette, // Palette as an Object or an Array. See bellow.
      },
      {
        name: 'Your second palette name',
        palette: yourSecondColorPalette,
      },
    ]
  }
};
```

#### On component

This will add color picker and palettes to all component's stories.

In `MyComponent.stories.js` add:

```tsx
const meta = {
  ...
  parameters: {
    colorPicker: {
      primaryPalette: 'Your first palette name',
      palettes: [
        {
          name: 'Your first palette name',
          palette: yourFirstColorPalette,
        },
        {
          name: 'Your second palette name',
          palette: yourSecondColorPalette,
        },
      ]
    }
  }
}

export const PrimaryComponent = { args: {...} }

export default meta
```

#### On story

This will add color picker and palettes to specific story.

In `MyComponent.stories.js` add:

```tsx
export const SecondaryComponent = {
  ...
  parameters: {
    colorPicker: {
      primaryPalette: 'Colorful palette',
      applyColorTo: ['label'],
      disableDefaultPalettes: true,
      theme: 'dark',
    },
  }
}
```

## Palette

### as Object

```tsx
type ColorPaletteAsObject = Record<string, Record<string, string> | string>
```

Example:

```tsx
  {
    white: "#fff", // valid hex, rgb, rgba, hsl, hsla
    black: "#000",
    light: {
      " 500": "#aaa",
      " 100": "rgba(238, 238, 238, .8)",
      " 200": "rgb(238, 238, 238)",
      " 300": "hsla(0, 0%, 73%, .8)",
      " 400": "hsl(0, 0%, 73%)"
    },
    dark: {
      "0100": "#888",
      "0500": "#000",
      "0400": "#222",
      "0200": "#666",
      "0300": "#444"
    }
  }
```

`Useful tip: add white spaces or zeros before numerical keys to prevent auto sorting`

### as Array

```tsx
type ColorPaletteAsArray = {
  label: string
  values: [
    {
      label: string
      value: string
    },
  ]
}
```

Example:

```tsx
const myArrayPalette = [
  {
    label: 'light',
    values: [
      {
        label: '100',
        value: '#fff',
      },
      {
        label: '200',
        value: '#aaa',
      },
    ],
  },
  {
    label: 'dark',
    values: [
      {
        label: '100',
        value: '#222',
      },
      {
        label: '200',
        value: '#000000',
      },
    ],
  },
]
```

### Set primary palette on component or its stories

#### On component

This will apply for all component's stories.

In `MyComponent.stories.js` add:

```tsx
const meta = {
  ...
  parameters: {
    colorPicker: {
      primaryPalette: 'Your second palette name',
    }
  }
};
```

#### On story

This will apply for specific story.

In `MyComponent.stories.js` add:

```tsx
export const SecondaryComponent = {
  ...
  parameters: {
    colorPicker: {
      primaryPalette: 'Your first palette name',
    }
  }
}
```

#### primaryPalette specificity:

The following list increases by specificity.

1. `primaryPalette` set on parameters in `preview.js`
2. `primaryPalette` set on component `parameters`
3. `primaryPalette` set on story `MyComponent.parameters`

## Apply selected color to component's control

All controls with type of "color" will be detected automatically.
You can add extra controls to which color may be applied. Only controls of type "text" may be added as extra.

### On component

Add list of extra controls to all component's stories.

In `MyComponent.stories.js` add:

```jsx
const meta = {
  ...
  argTypes: {
    backgroundColor: { control: 'color' }, // Color controls will be detected automatically
    label: { control: 'text' }, // Text controls may be added as extra
    text: { control: 'text' }, // Text controls may be added as extra
  },
  parameters: {
    colorPicker: {
      applyColorTo: ['label'] // Must match argType key
    }
  }
};
```

### On story

Add list of extra controls to selected story to overwrite list added to component globally as in example above.

In `MyComponent.stories.js` add:

```jsx
export const SecondaryComponent = {
  ...
  parameters: {
    colorPicker: {
      applyColorTo: ['text'], // Pass empty array to clear extra controls
    }
  }
};
```

## Default palettes

### Disable default palettes

To disable default palettes just add `disableDefaultPalettes: true` to global, component or story parameters.

## Theme

Storybook-color-picker will adjust automatically to the theme set on storybook.

To override the storybook theme:

```jsx
const meta = {
  ...
  parameters: {
    colorPicker: {
      theme: 'light' | 'dark' | 'auto' // Default 'auto'
    }
    ...
  }
};
```
