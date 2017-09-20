import React from 'react';
import { Plugin } from '@blueeast/bluerain-os';
import {
	// IntlProvider,
	injectIntl,
	addLocaleData,
	FormattedMessage,
	FormattedNumber,
	FormattedPlural,
	FormattedDate,
	FormattedTime,
	FormattedRelative
} from 'react-intl';

import { updateIntl, intlReducer } from './redux';
import { connect } from 'react-redux';
import IntlProvider from './redux/IntlProvider';

import defaultConfigs from './defaultConfigs';
import settings from './settings';

const rtlDetect = require('rtl-detect');

const withIntl = App => props => (
  <IntlProvider>
    <App {...props} />
  </IntlProvider>
	);

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
      function AddInternationalizationToSystemApp(App) { return withIntl(App); }
		);

		ctx.Filters.add(
			'bluerain.redux.initialState',
			function AddIntlInitState(state) {
				const messages = ctx.Filters.run('bluerain.intl.messages', {});
				return Object.assign({}, state, {
					bluerain: {
						intl: {
							locale,
							rtl: rtlDetect.isRtlLang(locale),
							messages,
						}
					}
				});
			}
		);

		ctx.Filters.add(
			'bluerain.redux.reducers.bluerain',
			function AddIntlReducer(reducers) {
				return Object.assign({}, reducers, {
					intl: intlReducer
				});
			}
		);

		/**
		 * Integrations
		 */
		// Settings App
		ctx.Filters.add('app.settings.general', settings(ctx, config));
	}

	/**
	 * Change app's locale
	 *
	 * @param {string} locale The locale id
	 * @param {BlueRain} ctx	The BlueRain Context
	 */
	static setLocale(locale, ctx) {
		try {
			ctx.refs.store.dispatch(updateIntl(locale));
		} catch (e) {
			console.log('There was an error changing locale');
		}
	}

	static withIntl(Component) {
		return connect(state => ({ intl: state.bluerain.intl }) )(Component);
	}

	static injectIntl(Component) {
		return injectIntl(Component);
	}
}

export default InternationalizationPlugin;
