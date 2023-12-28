import { useColorScheme as useColorSchemeRN } from 'react-native';

import { useConfig } from './useConfig';

export type ColorSchemeName = 'light' | 'dark';

export function useColorScheme(): ColorSchemeName {
	const [mode] = useConfig('theme.mode');

	if (mode === 'light' || mode === 'dark') {
		return mode;
	}

	try {
		const colorScheme = useColorSchemeRN();

		if (!colorScheme) {
			return 'light';
		}

		return colorScheme;
	} catch (error) {
		return 'light';
	}
}
