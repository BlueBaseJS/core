import { BlueBaseContext } from '../contexts';
import { useContext } from 'react';

export function useBlueBase() {
	return useContext(BlueBaseContext);
}
