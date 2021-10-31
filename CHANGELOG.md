# [7.0.0-beta.1](https://github.com/BlueBaseJS/core/compare/v6.1.1...v7.0.0-beta.1) (2021-10-31)

### Code Refactoring

*   Removed Picker component ([19f4321](https://github.com/BlueBaseJS/core/commit/19f43211134e37dcc461fd28d38b6bdd613d60a7))

### Features

*   Expo 43 ([dc94af8](https://github.com/BlueBaseJS/core/commit/dc94af8f078f716f47a19153cf12e1f4dc943026))
*   Upgraded Expo to V43 ([13053d1](https://github.com/BlueBaseJS/core/commit/13053d1fdb3bf84e7620600de71b9aef453e80b7))

### BREAKING CHANGES

*   Upgrade project to Expo 43
*   Picker component is removed because it is not part of react native core anymore

## [6.1.1](https://github.com/BlueBaseJS/core/compare/v6.1.0...v6.1.1) (2020-12-31)

### Bug Fixes

*   **added hooks for latest preferences:** added hooks for latest preferences ([fd25124](https://github.com/BlueBaseJS/core/commit/fd25124))
*   **added hooks of components:** added hooks of components ([57e8e7e](https://github.com/BlueBaseJS/core/commit/57e8e7e))
*   **if no option of mode then toggle to no preferences:** if no option of mode then toggle to no preferences ([b70ddbf](https://github.com/BlueBaseJS/core/commit/b70ddbf))

# [6.1.0](https://github.com/BlueBaseJS/core/compare/v6.0.2...v6.1.0) (2020-09-30)

### Features

*   **BlueBaseAppTestError:** Better error debugging in test enviornments ([6c1391d](https://github.com/BlueBaseJS/core/commit/6c1391d))

## [6.0.2](https://github.com/BlueBaseJS/core/compare/v6.0.1...v6.0.2) (2020-09-02)

### Bug Fixes

*   **BlueBaseFilter:** Better error debugging ([906ee32](https://github.com/BlueBaseJS/core/commit/906ee32))

## [6.0.1](https://github.com/BlueBaseJS/core/compare/v6.0.0...v6.0.1) (2020-08-26)

### Bug Fixes

*   **useFilter:** Fixed an issue where app was being unmounted ([3a689f8](https://github.com/BlueBaseJS/core/commit/3a689f8))

# [6.0.0](https://github.com/BlueBaseJS/core/compare/v5.11.1...v6.0.0) (2020-08-26)

### Bug Fixes

*   **filter:** resolved rerendering of filter hook ([#306](https://github.com/BlueBaseJS/core/issues/306)) ([5b033e3](https://github.com/BlueBaseJS/core/commit/5b033e3))
*   **VIew:** Fixed an issue where RCTView was crashing app ([3153910](https://github.com/BlueBaseJS/core/commit/3153910))

### Features

*   **🎨 Themes:** New theme engine ([#421](https://github.com/BlueBaseJS/core/issues/421)) ([dcfcc4f](https://github.com/BlueBaseJS/core/commit/dcfcc4f))
*   **PluginRegistry:** Routes are now evaluated on render, not on boot ([6d1373c](https://github.com/BlueBaseJS/core/commit/6d1373c))

### BREAKING CHANGES

*   **PluginRegistry:** Route config thunk no longer receive BB as a param. It receives RouteOptions param instead.

*   **🎨 Themes:** - Updated `theme.name` config to `theme`

*   Typings updated

*   Internal functions and API changed

# [6.0.0-alpha.3](https://github.com/BlueBaseJS/core/compare/v6.0.0-alpha.2...v6.0.0-alpha.3) (2020-08-26)

### Features

*   **PluginRegistry:** Routes are now evaluated on render, not on boot ([6d1373c](https://github.com/BlueBaseJS/core/commit/6d1373c))

### BREAKING CHANGES

*   **PluginRegistry:** Route config thunk no longer receive BB as a param. It receives RouteOptions param instead.

# [6.0.0-alpha.2](https://github.com/BlueBaseJS/core/compare/v6.0.0-alpha.1...v6.0.0-alpha.2) (2020-08-25)

### Bug Fixes

*   **VIew:** Fixed an issue where RCTView was crashing app ([3153910](https://github.com/BlueBaseJS/core/commit/3153910))

# [6.0.0-alpha.1](https://github.com/BlueBaseJS/core/compare/v5.11.1...v6.0.0-alpha.1) (2020-08-04)

### Bug Fixes

*   **filter:** resolved rerendering of filter hook ([#306](https://github.com/BlueBaseJS/core/issues/306)) ([5b033e3](https://github.com/BlueBaseJS/core/commit/5b033e3))

### Features

*   **🎨 Themes:** New theme engine ([#421](https://github.com/BlueBaseJS/core/issues/421)) ([dcfcc4f](https://github.com/BlueBaseJS/core/commit/dcfcc4f))

### BREAKING CHANGES

*   **🎨 Themes:** - Updated `theme.name` config to `theme`

*   Typings updated

*   Internal functions and API changed

## [5.11.1](https://github.com/BlueBaseJS/core/compare/v5.11.0...v5.11.1) (2020-02-24)

### Bug Fixes

*   **filter:** resolved rerendering of filter hook ([#306](https://github.com/BlueBaseJS/core/issues/306)) ([#307](https://github.com/BlueBaseJS/core/issues/307)) ([2c7ad18](https://github.com/BlueBaseJS/core/commit/2c7ad18))

# [5.11.0](https://github.com/BlueBaseJS/core/compare/v5.10.0...v5.11.0) (2020-01-27)

### Features

*   **🎁 ComponentRegistry:** Added `resolveFromCache` method ([a22075f](https://github.com/BlueBaseJS/core/commit/a22075f))
*   **getComponent:** Uses the new resolveFromCache method ([8efb8f5](https://github.com/BlueBaseJS/core/commit/8efb8f5))
*   **hooks:** Added useComponent hook ([9af1b0e](https://github.com/BlueBaseJS/core/commit/9af1b0e))

# [5.10.0](https://github.com/BlueBaseJS/core/compare/v5.9.1...v5.10.0) (2020-01-27)

### Features

*   **Registry:** Improved Error messages ([b1348f7](https://github.com/BlueBaseJS/core/commit/b1348f7)), closes [#217](https://github.com/BlueBaseJS/core/issues/217)

## [5.9.1](https://github.com/BlueBaseJS/core/compare/v5.9.0...v5.9.1) (2020-01-23)

### Bug Fixes

*   **ComponentState:** Styles updated to resolve title and image overlap ([#282](https://github.com/BlueBaseJS/core/issues/282)) ([4ab2465](https://github.com/BlueBaseJS/core/commit/4ab2465))

# [5.9.0](https://github.com/BlueBaseJS/core/compare/v5.8.0...v5.9.0) (2019-12-24)

### Features

*   **BlueBase:** Added ability to reset on reboot ([b375af4](https://github.com/BlueBaseJS/core/commit/b375af4))

# [5.8.0](https://github.com/BlueBaseJS/core/compare/v5.7.0...v5.8.0) (2019-12-21)

### Features

*   **🔀 Navigation:** Adds a NavigationContext & useNavigation hook ([8969aae](https://github.com/BlueBaseJS/core/commit/8969aae))
*   New Logo ([#158](https://github.com/BlueBaseJS/core/issues/158)) ([be1acb7](https://github.com/BlueBaseJS/core/commit/be1acb7))

# [5.7.0](https://github.com/BlueBaseJS/core/compare/v5.6.0...v5.7.0) (2019-12-21)

### Bug Fixes

*   **BlueBaseImage:** Fixed a bad import statement ([cfaa5c9](https://github.com/BlueBaseJS/core/commit/cfaa5c9))

### Features

*   **🚨 BlueBaseAppError:** New UX ([e89b114](https://github.com/BlueBaseJS/core/commit/e89b114))
*   **BlueBaseApp:** BlueBaseApp is now a functional component ([e9b83f7](https://github.com/BlueBaseJS/core/commit/e9b83f7))
*   **BlueBaseApp:** Shows error message in prod during infinite crash ([3a27ef0](https://github.com/BlueBaseJS/core/commit/3a27ef0))
*   **BlueBaseAppLoading:** New loading UI ([09a1973](https://github.com/BlueBaseJS/core/commit/09a1973))

# [5.6.0](https://github.com/BlueBaseJS/core/compare/v5.5.1...v5.6.0) (2019-12-19)

### Features

*   **BlueBaseImageBackground:** Added component ([#245](https://github.com/BlueBaseJS/core/issues/245)) ([2e0d9ef](https://github.com/BlueBaseJS/core/commit/2e0d9ef))

## [5.5.1](https://github.com/BlueBaseJS/core/compare/v5.5.0...v5.5.1) (2019-12-16)

### Bug Fixes

*   **useStyles:** Fixed hook typings ([aa0c33a](https://github.com/BlueBaseJS/core/commit/aa0c33a))

# [5.5.0](https://github.com/BlueBaseJS/core/compare/v5.4.1...v5.5.0) (2019-12-15)

### Features

*   **🎨 ThemeProvider:** Now supports mode prop ([2e126a5](https://github.com/BlueBaseJS/core/commit/2e126a5))
*   **🎨 ThemeProvider:** Rewrote to use hooks api ([bc580e4](https://github.com/BlueBaseJS/core/commit/bc580e4))
*   **🚇 BlueBaseFilter:** Now uses useFilter hook ([50a377f](https://github.com/BlueBaseJS/core/commit/50a377f))
*   **BlueBaseAppError:** Removed "BlueBase" from error title. ([c177956](https://github.com/BlueBaseJS/core/commit/c177956))
*   **useStyles:** Adds useStyles hook ([0e25b77](https://github.com/BlueBaseJS/core/commit/0e25b77))
*   **🈯️ IntlContext:** Updated to use hooks api ([86eae71](https://github.com/BlueBaseJS/core/commit/86eae71))

### Performance Improvements

*   **Contexts:** Updated hooks and contexts ([b57954d](https://github.com/BlueBaseJS/core/commit/b57954d))

## [5.4.1](https://github.com/BlueBaseJS/core/compare/v5.4.0...v5.4.1) (2019-12-06)

### Bug Fixes

*   **workflow:** added privilged access to the image ([e72f818](https://github.com/BlueBaseJS/core/commit/e72f818))
*   **workflow:** changed version for checkout action ([23e940a](https://github.com/BlueBaseJS/core/commit/23e940a))
*   **workflow:** fixed prepublish not being executed ([dd1985d](https://github.com/BlueBaseJS/core/commit/dd1985d))

# [5.4.0](https://github.com/BlueBaseJS/core/compare/v5.3.1...v5.4.0) (2019-12-02)

### Features

*   **🎁 ComponentRegistry:** Allow React.memo components ([65d8bce](https://github.com/BlueBaseJS/core/commit/65d8bce))
*   **getComponent:** Now uses hooks api ([5c86b8b](https://github.com/BlueBaseJS/core/commit/5c86b8b))

## [5.3.1](https://github.com/BlueBaseJS/core/compare/v5.3.0...v5.3.1) (2019-11-22)

### Bug Fixes

*   **workflow:** fixed build docs step ([2d5d9e1](https://github.com/BlueBaseJS/core/commit/2d5d9e1))

# [5.3.0](https://github.com/BlueBaseJS/core/compare/v5.2.0...v5.3.0) (2019-11-22)

### Bug Fixes

*   **add npmrc file :** add npmrc registry ([c5e7815](https://github.com/BlueBaseJS/core/commit/c5e7815))
*   **npmrc:** removed npmrc ([e327b4e](https://github.com/BlueBaseJS/core/commit/e327b4e))
*   **workflow:** updated environment variable ([c767876](https://github.com/BlueBaseJS/core/commit/c767876))
*   **workflow:** using git credentials for @semantic-release/git ([3637f20](https://github.com/BlueBaseJS/core/commit/3637f20))

### Features

*   **applyStyles:** defaultStyles fn gets props as second param ([2a169c2](https://github.com/BlueBaseJS/core/commit/2a169c2))

# [5.2.0](https://github.com/BlueBaseJS/core/compare/v5.1.0...v5.2.0) (2019-11-07)

### Bug Fixes

*   **semantic release:** set env variable ([698ab43](https://github.com/BlueBaseJS/core/commit/698ab43))
*   **workflow:** changed environment variable ([5dea463](https://github.com/BlueBaseJS/core/commit/5dea463))
*   **workflow:** moved environment variables ([d726102](https://github.com/BlueBaseJS/core/commit/d726102))
*   **workflow:** tokens ([effb3f9](https://github.com/BlueBaseJS/core/commit/effb3f9))
*   **workflow:** updated token in release ([6aae05f](https://github.com/BlueBaseJS/core/commit/6aae05f))
*   **workflow:** updated workflows ([4c96897](https://github.com/BlueBaseJS/core/commit/4c96897))

### Features

*   **getComponent:** Now takes components as input ([1d01095](https://github.com/BlueBaseJS/core/commit/1d01095))

# [5.1.0](https://github.com/BlueBaseJS/core/compare/v5.0.2...v5.1.0) (2019-10-01)

### Features

*   Added source to all registrys ([9810c5b](https://github.com/BlueBaseJS/core/commit/9810c5b))
*   Each registry item gets an item source ([1c69b40](https://github.com/BlueBaseJS/core/commit/1c69b40))

## [5.0.2](https://github.com/BlueBaseJS/core/compare/v5.0.1...v5.0.2) (2019-09-24)

### Bug Fixes

*   Removed slider component  ([#154](https://github.com/BlueBaseJS/core/issues/154)) ([8a7a1fc](https://github.com/BlueBaseJS/core/commit/8a7a1fc))

## [5.0.1](https://github.com/BlueBaseJS/core/compare/v5.0.0...v5.0.1) (2019-09-24)

### Bug Fixes

*   **package.json:** removing npmrc file ([48a34c8](https://github.com/BlueBaseJS/core/commit/48a34c8))

# [5.0.0](https://github.com/BlueBaseJS/core/compare/v4.0.0...v5.0.0) (2019-09-24)

### Bug Fixes

*   **dev workflow:** removed sudo from semantic release ([12085d3](https://github.com/BlueBaseJS/core/commit/12085d3))

### BREAKING CHANGES

*   **dev workflow:** Version Upgrade
