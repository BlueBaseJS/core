import { Configs } from '../Configs';
import { I18nManager } from 'react-native';
import rtlDetect from 'rtl-detect';
import { useBlueBase } from './useBlueBase';
import { useConfigUpdates } from './useConfigUpdates';
import { useState } from 'react';

export function useRtl() {
	const BB = useBlueBase();

	const [rtl, setRtl] = useState(false);
	const [directionState, setDirectionState] = useState(BB.Configs.getValue('direction'));

	/**
	 * Sets a theme to Provider's state. If a theme key is given, it is used,
	 * otherwise global theme is used.
	 *
	 * @param slug
	 * @param BB
	 */
	function updateDirection(direction?: Configs['direction']) {
		const locale = BB.Configs.getValue('locale');
		const dir: Configs['direction'] = direction || BB.Configs.getValue('direction');

		// Decide if layout should be RTL or not
		let shouldBeRtl = false;

		if (dir === 'ltr') {
			shouldBeRtl = false;
		} else if (dir === 'rtl') {
			shouldBeRtl = true;
		} else if (dir === 'auto') {
			shouldBeRtl = !!rtlDetect.isRtlLang(locale);
		}

		// Everything is it should be, so do nothing
		if (shouldBeRtl === rtl && dir === directionState) {
			return;
		}

		// Update layout
		I18nManager.forceRTL(shouldBeRtl);

		// Update state
		setDirectionState(dir);
		setRtl(shouldBeRtl);
	}

	if (BB.Configs.getValue('direction') !== directionState) {
		updateDirection();
	}

	useConfigUpdates('direction', updateDirection);
	useConfigUpdates('locale', () => updateDirection());

	return {
		direction: directionState,
		rtl,
		setDirection: updateDirection,
	};
}
