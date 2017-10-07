export const getResponsiveState = (size) => {
	if (size === 'xs' || size === 'sm') {
		return {
			open: false,
			docked: false,
			hideLabels: false,
		};
	}
	return {
		open: true,
		docked: true,
		hideLabels: true,
	};

};

export default (size) => {
	const state = getResponsiveState(size);
	state.disabled = false;

	return state;
};
