![Tinacious Design Syntax](https://raw.githubusercontent.com/tinacious/vscode-tinacious-design-syntax/master/images/tinacious-design-syntax.png)

**Tinacious Design Syntax** is a syntax theme that uses a bright palette of colours including pink, blue, turquoise, green, purple, and orange.

![](https://raw.githubusercontent.com/tinacious/vscode-tinacious-design-syntax/master/images/tinacious-design-syntax-swatches.png)

Colours curated by Web and Mobile designer and developer Tina from [Tinacious Design](http://tinaciousdesign.com).

## Variations

This syntax theme is now available in both dark and light variations.

### Dark

![dark syntax theme tinacious design](https://github.com/tinacious/vscode-tinacious-design-syntax/raw/master/images/tinacious-syntax-theme-vscode-dark.png)


### Light

![light syntax theme tinacious design](https://github.com/tinacious/vscode-tinacious-design-syntax/raw/master/images/tinacious-light-syntax-theme-vscode.png)


## Git integration

The default Git diff styling doesn't work well with this theme, especially for comment colours. In order to modify the diff colours, add the following snippet to your user settings:

```json
// Diff themeing for Tinacious Design theme
"workbench.colorCustomizations": {
  "diffEditor.insertedTextBackground": "#00D3641A",
  "diffEditor.removedTextBackground": "#FF339933"
}
```

![Screenshot of diff theme](https://cloud.githubusercontent.com/assets/1856992/25773217/e5706fdc-3247-11e7-81a6-5e2f45d49e4a.png)

## Changelog

| Date        | Version | Change                                                                                             |
|:------------|:--------|:---------------------------------------------------------------------------------------------------|
| 5 Mar 2017  | 0.2.0   | Added the Tinacious Design Light syntax theme. Increased contrast of current line & selected text. |
| 10 Oct 2016 | 0.1.0   | Initial release                                                                                    |
