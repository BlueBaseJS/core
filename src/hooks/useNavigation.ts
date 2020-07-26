import { NavigationContext } from '../contexts';
import { useContext } from 'react';

export function useNavigation() {
	return useContext(NavigationContext);
}
