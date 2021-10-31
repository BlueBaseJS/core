import { useContext } from 'react';

import { NavigationContext } from '../contexts';

export function useNavigation() {
	return useContext(NavigationContext);
}
