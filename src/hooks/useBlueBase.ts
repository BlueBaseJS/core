import { useContext } from 'react';

import { BlueBaseContext } from '../contexts';

export function useBlueBase() {
	return useContext(BlueBaseContext);
}
