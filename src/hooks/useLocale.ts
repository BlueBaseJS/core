import { Configs } from '../Configs';
import { useBlueBase } from './useBlueBase';
import { useConfigUpdates } from './useConfigUpdates';
import { useState } from 'react';

export function useLocale() {
	const BB = useBlueBase();

	const [locale, setLocaleState] = useState(BB.Configs.getValue('locale'));

	/**
	 * Sets a theme to Provider's state. If a theme key is given, it is used,
	 * otherwise global theme is used.
	 *
	 * @param slug
	 * @param BB
	 */
	async function setLocale(Locale?: Configs['locale']) {
		const l: Configs['direction'] = Locale || BB.Configs.getValue('locale');

		if (l !== locale) {
			setLocaleState(l);
		}
	}

	setLocale();

	useConfigUpdates('locale', setLocale);

	return [locale, setLocale];
}
