/**
 * Created by umair on 8/22/17.
 */
import React from 'react';
import { IntlProvider, addLocaleData, FormattedMessage } from 'react-intl';
import BR from '../../';

const withInternationalization = (App, locale) => (props) => {
	const messages = BR.Filters.run(
    'bluerain.intl.messages',
    {}
  );
	return (
  <IntlProvider locale={locale} messages={messages[locale]}>
    <App {...props} />
  </IntlProvider>
	);
};

class InternationalizationPlugin extends BR.Plugin {
	static pluginName = 'InternationalizationPlugin';
	static slug = 'Internationalization';

	static initialize(config = {}) {
		if (!config.locale) {
			config.locale = 'en';
		}
		const locale = config.locale;
		const localeData = require(`react-intl/locale-data/${locale}`);
		BR.Components.register('FormattedMessage', FormattedMessage);
		addLocaleData(localeData);
    // Add internationalization to main system app
		BR.Filters.add(
      'bluerain.system.app',
      function AddInternationalizationToSystemApp(App) {
	return withInternationalization(App, locale);
}
    );
	}
}

export default InternationalizationPlugin;
