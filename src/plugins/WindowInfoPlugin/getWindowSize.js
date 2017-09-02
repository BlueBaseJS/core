// Grid Upper limits
const gridLimits = {
	xs: 576,
	sm: 768,
	md: 992,
	lg: 1200
};

export default function getWindowSize(width = 0) {
	if (width < gridLimits.xs) {
		return 'xs';
	} else if (width < gridLimits.sm) {
		return 'sm';
	} else if (width < gridLimits.md) {
		return 'md';
	} else if (width < gridLimits.lg) {
		return 'lg';
	}

	return 'xl';
}
