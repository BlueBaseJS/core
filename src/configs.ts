import { Configs } from './models';
import { isProduction } from './utils';

export const BlueBaseDefaultConfigs: Configs = {
	'debug': !(isProduction()),
	'development': !(isProduction()),
	'direction': 'ltr',
	'locale': 'en',
	'theme.mode': 'light',
	'theme.name': 'bluebase-light',
	'theme.overrides': {},
	'title': 'BlueBase',
};
