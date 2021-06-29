import colorPalette from './colorPalette.json';
import colorPaletteArray from './colorPaletteArray.json';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  colorPalettes: {
    default: 'Colorfull palette',
    palettes: [
      {
        palette: colorPalette,
      },
      {
        name: 'Greyscale palette',
        palette: colorPaletteArray,
      },
    ],
  }
}