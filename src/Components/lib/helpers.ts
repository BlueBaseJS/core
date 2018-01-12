import react from 'react';
const isHidden = (screenSize, props) => {
	switch (screenSize) {
		case 'sm':
			return !!props.smHidden;
		case 'md':
			return !!props.mdHidden;
		case 'lg':
			return !!props.lgHidden;
		case 'xl':
			return !!props.xlHidden;
		case 'xs':
			return !!props.xsHidden;
		default:
			return false;
	}
};

const toPercent = num => `${num * 100}%`;

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

const getComponentOffset = (screenSize, props) => {
	switch (screenSize) {
		case 'sm':
			if (props.smOffset) {
				return toPercent(props.smOffset / props.rowSize);
			}
			return 0;

		case 'xs':
			if (props.xsOffset) {
				return toPercent(props.xsOffset / props.rowSize);
			}
			return 0;

		case 'xl':
			if (props.xlOffset) {
				return toPercent(props.xlOffset / props.rowSize);
			}
			return 0;

		case 'md':
			if (props.mdOffset) {
				return toPercent(props.mdOffset / props.rowSize);
			} else if (props.smOffset) {
				return toPercent(props.smOffset / props.rowSize);
			}
			return 0;

		case 'lg':
			if (props.lgOffset) {
				return toPercent(props.lgOffset / props.rowSize);
			} else if (props.mdOffset) {
				return toPercent(props.mdOffset / props.rowSize);
			} else if (props.smOffset) {
				return toPercent(props.smOffset / props.rowSize);
			}
			return 0;
		default:
			return 0;
	}
};

export { isHidden, getComponentWidth, getComponentOffset };
