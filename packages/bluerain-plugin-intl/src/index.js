import React from 'react';
import { Plugin } from '@blueeast/bluerain-os';
import { IntlProvider, addLocaleData, FormattedMessage, FormattedNumber, FormattedDate } from 'react-intl';

const withInternationalization = (App, locale, ctx) => (props) => {
	const messages = ctx.Filters.run('bluerain.intl.messages', {});
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

		let locale = ctx.Configs.get('locale');
		if (!locale) {
			locale = 'en';
		}

		const localeData = require(`react-intl/locale-data/${locale}`);
		addLocaleData(localeData);

		ctx.Components.register('FormattedMessage', FormattedMessage);
		ctx.Components.register('FormattedNumber', FormattedNumber);
		ctx.Components.register('FormattedDate', FormattedDate);

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
