import { ThemeContext } from '../themes';
import { useContext } from 'react';

export function useTheme() {
	return useContext(ThemeContext);
}
