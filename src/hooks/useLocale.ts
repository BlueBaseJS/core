import { useConfig } from './useConfig';

export function useLocale() {
	return useConfig('locale');
}
