/**
 * Created by umair on 8/22/17.
 */
import React from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import { Plugin, CallbackRegistry } from '../../../../../src/';

const messages = CallbackRegistry.run('bluerain.internationalization.lang', {});

const withInternationalization = (App, locale) => props => (
  <IntlProvider locale={locale} messages={messages[locale]} >
    <App {...props} />
  </IntlProvider>
);

class InternationalizationPlugin extends Plugin {
	static pluginName = 'InternationalizationPlugin';
	static slug = 'Internationalization';
	static initialize(config = {}) {
		if (!config.locale) {
			config.locale = 'ur';
		}
		const locale = config.locale;
		const localeData = require(`react-intl/locale-data/${locale}`);

		addLocaleData(localeData);
    // Add internationalization to main system app
		CallbackRegistry.add(
      'bluerain.system.app',
      function AddInternationalizationToSystemApp(App) {
	return withInternationalization(App, locale);
}
    );
	}
}

export default InternationalizationPlugin;
