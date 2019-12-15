import { BlueBaseContext } from '../Context';
import { useContext } from 'react';

export function useBlueBase() {
	return useContext(BlueBaseContext);
}
