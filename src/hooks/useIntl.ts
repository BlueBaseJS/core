import { IntlContext } from '../intl';
import { useContext } from 'react';

export function useIntl() {
	return useContext(IntlContext);
}
