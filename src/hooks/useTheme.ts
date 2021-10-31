import { useContext } from 'react';

import { ThemeContext } from '../contexts';

export function useTheme() {
	return useContext(ThemeContext);
}
