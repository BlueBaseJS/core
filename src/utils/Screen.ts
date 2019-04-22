import { Dimensions } from 'react-native';
import { SCREEN_SIZE } from '@bluebase/components';

// tslint:disable: object-literal-sort-keys

export const BREAKPOINTS = {
	xs: 576,
	sm: 768,
	md: 992,
	lg: 1200,
};

export const getScreenSizeFromWidth = (width: number): SCREEN_SIZE => {
	if (width < BREAKPOINTS.xs) {
		return 'xs';
	} else if (width < BREAKPOINTS.sm) {
		return 'sm';
	} else if (width < BREAKPOINTS.md) {
		return 'md';
	} else if (width < BREAKPOINTS.lg) {
		return 'lg';
	}

	return 'xl';
};

export const getScreenSize = () => getScreenSizeFromWidth(Dimensions.get('window').width);

export const isMobile = () => {
	const screenSize = getScreenSize();
	return screenSize === 'xs' || screenSize === 'sm';
};
