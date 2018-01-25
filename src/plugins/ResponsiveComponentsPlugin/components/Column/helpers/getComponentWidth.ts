import toPercent from './toPercent';

const getComponentWidth = (screenSize, props) => {
	switch (screenSize) {
		case 'sm':
			if (props.sm) {
				return toPercent(props.sm / props.rowSize);
			}
			return props.parentWidth;

		case 'xs':
			if (props.xs) {
				return toPercent(props.xs / props.rowSize);
			}
			return props.parentWidth;

		case 'xl':
			if (props.xl) {
				return toPercent(props.xl / props.rowSize);
			}
			return props.parentWidth;

		case 'md':
			if (props.md) {
				return toPercent(props.md / props.rowSize);
			} else if (props.sm) {
				return toPercent(props.sm / props.rowSize);
			}
			return props.parentWidth;

		case 'lg':
			if (props.lg) {
				return toPercent(props.lg / props.rowSize);
			} else if (props.md) {
				return toPercent(props.md / props.rowSize);
			} else if (props.sm) {
				return toPercent(props.sm / props.rowSize);
			}
			return props.parentWidth;

		default:
			return props.parentWidth;
	}
};

export default getComponentWidth;
