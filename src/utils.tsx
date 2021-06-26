import { ColorPalette } from "./colorPicker/colorPicker";

export const transformPalette = (colorPalette: ColorPalette) => {
  if (Array.isArray(colorPalette)) {
      return colorPalette;
  }

  const transformValues = (label: string, value: Record<string, string> | string) => {
      const isString = (typeof value) === 'string';

      if (isString) {
          return ([
              {
                  label,
                  value: value as string,
              }
          ])
      }
      return Object.entries(value).map(value => ({
          label: value[0],
          value: value[1],
      }))
  };

  return Object.entries(colorPalette).map(colors => ({
      label: colors[0],
      values: transformValues(colors[0], colors[1]),
  }))
};