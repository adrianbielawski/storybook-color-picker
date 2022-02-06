# Changelog

### v2.3.1

06.02.2022.

No breaking changes

**Bug Fix**

* Visibility of color value on color popup for colors with alpha.

* Active state highlight of color picker icon.

-----

### v2.3.0

09.01.2022.

**Changed**

* Added default palettes.

* `colorPalettes` parameter replaced with `colorPicker`.

* `default` and `defaultColorPalette` parameters replaced with `primaryPalette`.

* Changed width of color group name for better display of long names.

**Deprecation**

* `colorPalettes` parameter name is deprecated.
    - Use `colorPicker` instead.
    - It will be removed in next major release.

* `default` parameter name in `preview.js` parameters is deprecated.
    - Use `primaryPalette` instead.
    - It will be removed in next major release.

* `defaultColorPalette` parameter name in component and story parameters is deprecated. Use `primaryPalette` instead.
    - Use `primaryPalette` instead.
    - It will be removed in next major release.

-----

### v2.2.1

02.01.2022.

**Changed**

No breaking changes

* Color validation added.
    Automatically removes all invalid color values from palettes

* Keep picker settings for each story.

-----

### v2.1.5

30.11.2021.

**Changed**

No breaking changes

* Dependencies update.

-----

### v2.1.4

10.07.2021.

**Changed**

* Auto detect color controls.

-----

### v2.1.3

30.06.2021.

**Changed**

* Styles
    1. Highlight selected palette.
    2. Fixed dropdowns display on mobile.

-----

### v2.1.2

30.06.2021.

**Bug fix**

* Do not render addon if no color palette received.

-----

### v2.1.1

30.06.2021.

**Changed**

* README.md update.

-----

### v2.1.0

30.06.2021.

**Added**

* Set color on selected component's control.

**Changed**

* Copy color to clipboard is now optional.

-----

### v2.0.2

29.06.2021.

**Added**

* Default names.

-----

### v2.0.1

29.06.2021.

**Added**

* Support for default color palette on stories.

-----

### v2.0.0

28.06.2021.

**Breaking changes**

* Changed format of color palette passed to Storybook parameters.

**Added**

* Support for multiple color palettes.

-----