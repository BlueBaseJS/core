/**
 * Created by umair on 8/22/17.
 */
import React from 'react';
import { IntlProvider, addLocaleData, FormattedMessage } from 'react-intl';
import { Plugin, BlueRain, ComponentRegistry } from '../../';

const withInternationalization = (App, locale) => (props) => {
	const messages = BlueRain.filters.run(
    'bluerain.intl.messages',
    {}
  );
	return (
  <IntlProvider locale={locale} messages={messages[locale]}>
    <App {...props} />
  </IntlProvider>
	);
};

class InternationalizationPlugin extends Plugin {
	static pluginName = 'InternationalizationPlugin';
	static slug = 'Internationalization';
	static initialize(config = {}) {
		if (!config.locale) {
			config.locale = 'en';
		}
		const locale = config.locale;
		const localeData = require(`react-intl/locale-data/${locale}`);
		ComponentRegistry.register('FormattedMessage', FormattedMessage);
		addLocaleData(localeData);
    // Add internationalization to main system app
		BlueRain.filters.add(
      'bluerain.system.app',
      function AddInternationalizationToSystemApp(App) {
	return withInternationalization(App, locale);
}
    );
	}
}

export default InternationalizationPlugin;
