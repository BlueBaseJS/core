import { language } from './detect';

/**
 * This is the default configuration set that is used at boot time.
 *
 * @namespace
 * @property {Array}	locale [default: "en"]					Tries to detect automatically, falls back to 'en'.
 * @property {Array}	localeData				An array of localData files.
 */
const IntlPluginConfigs = {
	locale: language || 'en',
	localeData: [],
	selectable: {
		en: 'English'
	},
};

export default IntlPluginConfigs;
