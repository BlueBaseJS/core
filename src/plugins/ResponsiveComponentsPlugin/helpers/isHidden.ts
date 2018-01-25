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

export default isHidden;
