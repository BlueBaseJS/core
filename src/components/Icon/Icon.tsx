import { BlueRain, withBlueRain } from '../../index';
import React from 'react';

export interface IconProps {
	title: string,
	color: string
}

const Icon = (props: IconProps & { bluerain: BlueRain }) => {

	const { bluerain: BR, title, color } = props;

	const backgroundColor = color || 'rgb(220,53,69)';

	const titleStyle = BR.Utils.createStyleSheet({
		alignSelf: 'center',
		textAlign: 'center',
		backgroundColor,
		borderColor: backgroundColor,
		borderRadius: 10,
		borderWidth: 1,
		color: '#fff',
		fontSize: 68,
		padding: 20,
		shadowOffset: { height: 5, width: 0 },
		shadowRadius: 15,
		shadowColor: 'rgba(0,0,0,.3)'
	});

	return <BR.Components.Text style={titleStyle}>{title}</BR.Components.Text>;
};

// export default Icon;
export default withBlueRain(Icon) as React.ComponentType<any>;
