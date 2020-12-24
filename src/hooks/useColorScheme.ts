import { useColorScheme as useColorSchemeRN } from 'react-native-appearance';
import { useConfig } from './useConfig';

export type ColorSchemeName = 'light' | 'dark';

export function useColorScheme(): ColorSchemeName {
	const [modeConfig] = useConfig('theme.mode');

	let mode;
	try {
		const rnColorScheme = useColorSchemeRN();
		mode = rnColorScheme || 'light';
		if (mode === 'no-preference') {
			mode = 'light';
		}
	} catch (error) {
		mode = 'light';
	}

	return modeConfig === 'auto' ? mode : modeConfig;
}
