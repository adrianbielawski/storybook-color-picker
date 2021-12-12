import { ColorPalette, PaletteObj } from "src/colorPicker/types";
import { Story, Group } from "@storybook/api/dist/ts3.9/lib/stories";

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

export const findDefaultPaletteIndex = (palettes: PaletteObj[], defaultPalette: string) => {
    const index = palettes.findIndex(palette =>  palette.name === defaultPalette);

    if (index < 0) {
        return 0
    }

    return index;
};

export const getColorControls = (data: Story | Group, additionalApplyColorTo: string[]) => {
    const argTypes = (data.parameters as Record<string, any>)?.argTypes;
    const argTypesArray = Object.entries(argTypes);

    if (!argTypesArray.length) {
        return
    }

    const filteredArgTypes = argTypesArray.filter(arg =>
        (arg[1] as Record<string, any>).control?.type === 'color'
    );
    const colorControls = filteredArgTypes.map(arg => arg[0]);

    if (additionalApplyColorTo?.length) {
        const storyControls = argTypesArray.map(arg => arg[0]);
        const filteredAdditional = additionalApplyColorTo.filter(a =>
            storyControls.includes(a) && argTypes[a].control?.type === 'text'
        );

        const extendedControls = new Set(colorControls.concat(filteredAdditional));
        return Array.from(extendedControls);
    }

    return colorControls
}