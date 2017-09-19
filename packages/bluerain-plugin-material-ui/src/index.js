/* @flow */

import React from 'react';
import { Plugin } from '@blueeast/bluerain-os';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const withMUI = (App, theme, ctx) => (props) => {

	theme = ctx.Filters.run('material-ui.theme', theme);
	const muiTheme = getMuiTheme(theme);

	return (<MuiThemeProvider muiTheme={muiTheme}><App {...props} /></MuiThemeProvider>);
};

/**
 * Material UI Plugin
 * @property {string} pluginName "MaterialUiPlugin"
 * @property {string} slug "material-ui"
 */
class MaterialUiPlugin extends Plugin {

	static pluginName = 'MaterialUiPlugin';
	static slug = 'material-ui';

	static initialize(config = {}, ctx) {

		let theme = ctx.Configs.get('theme');
		if (!theme) {
			theme = {};
		}

		// Add Material UI Provider
		ctx.Filters.add(
      'bluerain.redux.app',
      function AddMUI(App) { return withMUI(App, theme, ctx); }
		);
	}
}

export default MaterialUiPlugin;
