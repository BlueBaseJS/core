import React from 'react';
import { Plugin } from '@blueeast/bluerain-os';
import {
	IntlProvider,
	addLocaleData,
	FormattedMessage,
	FormattedNumber,
	FormattedPlural,
	FormattedDate,
	FormattedTime,
	FormattedRelative
} from 'react-intl';

import defaultConfigs from './defaultConfigs';

const withIntl = (App, locale, ctx) => (props) => {
	const messages = ctx.Filters.run('bluerain.intl.messages', {});
	return (
  <IntlProvider locale={locale} messages={messages[locale]}>
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
      'bluerain.system.app',
      function AddInternationalizationToSystemApp(App) { return withIntl(App, locale, ctx); }
    );
	}
}

export default InternationalizationPlugin;
