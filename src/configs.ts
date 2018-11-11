import { BlueBaseConfigs } from './registries';
import { isProduction } from './utils';

export const BlueBaseDefaultConfigs: BlueBaseConfigs = {
	debug: !(isProduction()),
	development: !(isProduction()),
	direction: 'ltr',
	locale: 'en',
	theme: 'BlueBase.Light',
	title: 'BlueBase',
};
