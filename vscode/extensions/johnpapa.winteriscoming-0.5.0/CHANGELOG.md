## Winter is Coming theme Changelog

<a name="0.5.0"></a>
# 0.5.0 (2018-03-03)

* Changes
  * Variable from #96d5f9 to #b2d4fa to contrast with keywords
  * Minor shadings of light colors
  * Changed file name of theme to `WinterIsComing-dark-color-theme.json` in source code

<a name="0.4.7"></a>
# 0.4.7 (2017-11-20)

* Changes
  * debug bar border now matches debug status bar
  * dark theme
    * markdown bold #57cdff
    * markdown italic #C792EA
    * markdown raw string (inline code) #f7ecb5
    * markdown fenced code title #f7ecb5
  * light theme
    * markdown bold #4e76b5
    * markdown italic #C792EA
    * markdown raw string (inline code) #0460b1
    * markdown fenced code title #0460b1
    * `untrackedResourceForeground` is now clearer shade of green
    * `comment` is now clearer shade of green
    * `keyword` is now clearer shade of purple
    * `variable` is now clearer shade of blue

* These changes only apply to `.custom-vscodestyles.css`
  * italicized file tab font
  * default monaco `letter-spacing: .5px`
  * monaco panel title bar `letter-spacing: 1px;`
  * vs code's window title `color: #fafafa; letter-spacing: 1px; font-weight: 200;`

<a name="0.4.5"></a>
# 0.4.5 (2017-11-18)

* Changes
  * Comments are now gray
  * Removed the `editor.lineHighlightBorder` as it was hiding the cursor in some cases
  * Lightened `lineHighlightBackground` for light theme
  * Updated description

* These changes only apply to `.custom-vscodestyles.css`
  * to only affect dark theme where appropriate
  * make titlebar font yellow
  * yellow top and bottom border on debug bar

* Fixes
  * Fixed JSON string color for light them
  * Updated to the new name for `gitDecoration.modifiedResourceForeground`
  * Updated to the new name for `gitDecoration.untrackedResourceForeground`
  * Removed obsolete styles

<a name="0.4.0"></a>
# 0.4.0 (2017-11-16)

* Updated JSON file colors to blue and light yellow (for dark theme)
* Updated various constants to be #ec9cd2 (for dark theme)
* Italicized the comments and made them green (for dark theme)
* Matched light theme where applicable
* Added recommended settings to the README.md

<a name="0.3.2"></a>
# 0.3.2 (2017-11-08)

* Updated light color theme for HTML and CSS, based on Vue.js usage

<a name="0.3.1"></a>
# 0.3.1 (2017-10-31)

* Updated light color theme for `this`

<a name="0.3.0"></a>
# 0.3.0 (2017-10-26)

* Renamed theme to "Winter is Coming (dark)"
* Added a first draft of a light theme

<a name="0.2.1"></a>
# 0.2.1 (2017-10-23)

* sidebar list selection is same blue as theme
* added light green accents to git untracked badge

<a name="0.2.0"></a>
# 0.2.0 (2017-10-22)

* activity bar icons are blue
* line numbers are blue
* debugbar is lighter gray/black for contrast
* statusbar is same shade of blue as the theme
* debug statusbar is same shade of red/pink as the theme
* minor contrast adjustments
* peekview and find all references view now have better contrast
* peekview and find all references view has distinct border

<a name="0.1.4"></a>
# 0.1.4 (2017-10-20)

* Centered icon and reversed background
* Removed italics from most code
* Set function variables to soft purple/red
* Set `git.color.modified` to be blue

<a name="0.0.3"></a>
# 0.0.3 (2017-10-19)

* Set `git.color.modified` to be orange
* Set `git.color.untracked` to be green

<a name="0.0.2"></a>
# 0.0.2 (2017-10-18)

* Created Winter is Coming theme

