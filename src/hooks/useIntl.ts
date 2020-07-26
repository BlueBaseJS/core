import { IntlContext } from '../contexts';
import { useContext } from 'react';

export function useIntl() {
	return useContext(IntlContext);
}
