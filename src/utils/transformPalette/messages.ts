export const getInvalidShadeMessage = (
  paletteName: string,
  colorLabel: string,
  shadeLabel: string
) =>
  `%cInvalid color value in ${paletteName}: ${colorLabel} -> ${shadeLabel}. It has been removed from palette.`

export const getInvalidColorMessage = (
  paletteName: string,
  colorName: string
) =>
  `%cNo valid colors in ${paletteName} -> ${colorName}. It has been removed from palette.`

export const getInvalidPaletteMessage = (paletteName: string) =>
  `%cNo valid colors in ${paletteName}. Palette has been removed.`

export const warn = (message: string) => console.warn(message, 'color: red')
