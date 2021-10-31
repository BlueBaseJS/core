import { useColorScheme as useColorSchemeRN } from 'react-native';

import { useConfig } from './useConfig';

export type ColorSchemeName = 'light' | 'dark';

export function useColorScheme(): ColorSchemeName {
	const [modeConfig] = useConfig('theme.mode');

	let mode;
	try {
		const rnColorScheme = useColorSchemeRN();
		mode = rnColorScheme;
		if (mode !== 'light' && mode !== 'dark') {
			mode = 'light';
		}
	} catch (error: any) {
		mode = 'light';
	}

	return modeConfig === 'auto' ? mode : modeConfig;
}
