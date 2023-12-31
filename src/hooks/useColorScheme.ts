import { useColorScheme as useColorSchemeRN } from 'react-native';

import { useConfig } from './useConfig';

export type ColorSchemeName = 'light' | 'dark';

export function useColorScheme(): ColorSchemeName {
	try {
		const [mode] = useConfig('theme.mode');
		const colorScheme = useColorSchemeRN();

		if (mode === 'light' || mode === 'dark') {
			return mode;
		}

		if (!colorScheme) {
			return 'light';
		}

		return colorScheme;
	} catch (error) {
		return 'light';
	}
}
