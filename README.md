
> ⚠️ This is a work in progress and the API is not stable. May not be fit for use in production.

# BlueRain OS


A modular, pluggable and cross-platform app framework. It is built on top of [ReactXP](https://microsoft.github.io/reactxp/) (which utilizes [ReactDOM](https://facebook.github.io/react/docs/react-dom.html) for web and [React Native](https://facebook.github.io/react-native/) for mobile).

## 🎊 Status 
[![npm version](https://badge.fury.io/js/%40blueeast%2Fbluerain-os.svg)](https://github.com/BlueEastCode/bluerain-os) [![Build Status](https://travis-ci.org/BlueEastCode/bluerain-os.svg?branch=master)](https://travis-ci.org/BlueEastCode/bluerain-os) [![bitHound Overall Score](https://www.bithound.io/github/BlueEastCode/bluerain-os/badges/score.svg)](https://www.bithound.io/github/BlueEastCode/bluerain-os) [![bitHound Dependencies](https://www.bithound.io/github/BlueEastCode/bluerain-os/badges/dependencies.svg)](https://www.bithound.io/github/BlueEastCode/bluerain-os/develop/dependencies/npm) [![bitHound Dev Dependencies](https://www.bithound.io/github/BlueEastCode/bluerain-os/badges/devDependencies.svg)](https://www.bithound.io/github/BlueEastCode/bluerain-os/develop/dependencies/npm) [![bitHound Code](https://www.bithound.io/github/BlueEastCode/bluerain-os/badges/code.svg)](https://www.bithound.io/github/BlueEastCode/bluerain-os) [![Known Vulnerabilities](https://snyk.io/test/npm/@blueeast/bluerain-os/badge.svg)](https://snyk.io/test/npm/@blueeast/bluerain-os)


## 🎭 Platforms
- 📱 Mobile (Android & iOS) with [React Native](https://facebook.github.io/react-native/) through [ReactXP](https://microsoft.github.io/reactxp/)
- 💻 Web with [ReactDOM](https://facebook.github.io/react/docs/react-dom.html)
- 🖥 Desktop with [ReactDOM](https://facebook.github.io/react/docs/react-dom.html) & [Electron](https://electron.atom.io/)

## 🏆 Features
- 📦 Apps Architecture
- 🤖 Plugin Architecture
- 🔧 Centralized Configurations
- 💅 Themes
- 🔥 Event and Callbacks
- 🌏 Server Side Rendering
- 🔀 Routing through React Router 4

### 🎨 Other features through official plugins
- 🈯️ Internationalization through react-intl
- 💥 State management through redux
- 🚀 GraphQL integration through Apollo GraphQL Client
- 🚨 Error Reporting through Sentry integration


## 🤖 Available plugins

Name | Description | Dependency
------ | ------ | ------
Apollo | A fully-featured, production ready caching GraphQL client for every server or UI framework. Based on [Apollo Client](http://dev.apollodata.com/react/). | Redux
Internationalization | Internationalize React apps. This library provides React components and an API to format dates, numbers, and strings, including pluralization and handling translations. Based on [react-intl](https://github.com/yahoo/react-intl). | Redux
Material UI | Adds [Material UI](http://www.material-ui.com/#/) theme Provider to BlueRain. | 
React Router (v4) | [React Router V4](https://github.com/ReactTraining/react-router) and [Redux integration](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux). | Redux
Redux | Predictable state container for JavaScript apps. Based on [Redux](http://redux.js.org/) & [React Redux](https://github.com/reactjs/react-redux).
Redux DevTools | [DevTools](https://github.com/gaearon/redux-devtools) for Redux with hot reloading, action replay, and customizable UI.  | Redux
Sentry (Coming Soon) | [Sentry](https://sentry.io/) is a cross-platform crash reporting and aggregation platform. 
