import React from 'react';
import { Plugin } from '@blueeast/bluerain-os';
import { IntlProvider, addLocaleData, FormattedMessage } from 'react-intl';

const withInternationalization = (App, locale, ctx) => (props) => {
	const messages = ctx.Filters.run(
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

	static initialize(config = {}, ctx) {
		if (!config.locale) {
			config.locale = 'en';
		}
		const locale = config.locale;
		const localeData = require(`react-intl/locale-data/${locale}`);
		ctx.Components.register('FormattedMessage', FormattedMessage);
		addLocaleData(localeData);
    // Add internationalization to main system app
		ctx.Filters.add(
      'bluerain.system.app',
      function AddInternationalizationToSystemApp(App) {
	return withInternationalization(App, locale, ctx);
}
    );
	}
}

export default InternationalizationPlugin;
