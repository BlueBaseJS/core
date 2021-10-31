import { useEffect, useState } from 'react';
import { I18nManager } from 'react-native';
import rtlDetect from 'rtl-detect';

import { Configs } from '../Configs';
import { useConfig } from './useConfig';

export function useRtl() {
	const [direction, setDirection] = useConfig<Configs['direction']>('direction');
	const [locale] = useConfig('locale');
	const [rtl, setRtl] = useState(false);

	/**
	 * Calculate and update RTL flag based on locale and direction
	 *
	 * @param slug
	 * @param BB
	 */
	function updateRtl() {
		// Decide if layout should be RTL or not
		let shouldBeRtl = false;

		// Left to Right
		if (direction === 'ltr') {
			shouldBeRtl = false;
		}
		// Right to Left
		else if (direction === 'rtl') {
			shouldBeRtl = true;
		}
		// direction === 'auto'
		else {
			shouldBeRtl = !!rtlDetect.isRtlLang(locale);
		}

		// Everything is it should be, so do nothing
		if (shouldBeRtl === rtl) {
			return;
		}

		// Update layout
		I18nManager.forceRTL(shouldBeRtl);

		// Update state
		setRtl(shouldBeRtl);
	}

	useEffect(updateRtl, [direction, locale]);

	return {
		direction,
		rtl,
		setDirection,
	};
}
