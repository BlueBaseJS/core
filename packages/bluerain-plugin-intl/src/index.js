import React from 'react';
import { Plugin } from '@blueeast/bluerain-os';
import {
	// IntlProvider,
	addLocaleData,
	FormattedMessage,
	FormattedNumber,
	FormattedPlural,
	FormattedDate,
	FormattedTime,
	FormattedRelative
} from 'react-intl';

import { updateIntl, IntlProvider, intlReducer } from 'react-intl-redux';

import defaultConfigs from './defaultConfigs';

let messages = {};
const withIntl = (App, locale, ctx) => (props) => {
	return (
  <IntlProvider>
    <App {...props} />
  </IntlProvider>
	);
};

/**
 * react-intl plugin to add internationalization to BlueRain Apps
 * @property {string} pluginName "InternationalizationPlugin"
 * @property {string} slug "intl"
 */
class InternationalizationPlugin extends Plugin {
	static pluginName = 'InternationalizationPlugin';
	static slug = 'intl';

	static initialize(config = {}, ctx) {

		config = Object.assign({}, defaultConfigs, config);

		let locale = ctx.Configs.get('locale');
		if (!locale) {
			locale = config.locale;
		}

		addLocaleData(config.localeData);

		// Registering Components
		ctx.Components.register('FormattedMessage', FormattedMessage);
		ctx.Components.register('FormattedNumber', FormattedNumber);
		ctx.Components.register('FormattedPlural', FormattedPlural);
		ctx.Components.register('FormattedDate', FormattedDate);
		ctx.Components.register('FormattedTime', FormattedTime);
		ctx.Components.register('FormattedRelative', FormattedRelative);

		// Add internationalization to main system app
		ctx.Filters.add(
      'bluerain.redux.app',
      function AddInternationalizationToSystemApp(App) { return withIntl(App, locale, ctx); }
		);

		ctx.Filters.add(
			'bluerain.redux.initialState',
			function AddIntlInitState(state) {
				messages = ctx.Filters.run('bluerain.intl.messages', messages);
				return Object.assign({}, state, { intl: { locale, messages: messages[locale] } });
			}
		);

		ctx.Filters.add(
			'bluerain.redux.reducers',
			function AddIntlReducer(reducers) {
				return Object.assign({}, reducers, {
					intl: intlReducer
				});
			}
		);
	}

	static setLocale(locale, BR) {
		try {
			const localMessages = messages[locale];
			BR.refs.store.dispatch(updateIntl({
				locale,
				messages: localMessages,
			}));
		} catch (e) {
			console.log('There was an error changing locale');
		}
	}
}

export default InternationalizationPlugin;
