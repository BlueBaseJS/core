import toPercent from './toPercent';

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

export default getComponentOffset;
