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
  colorPalette: colorPaletteArray,
}