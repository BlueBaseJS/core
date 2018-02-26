import { BlueRain, withBlueRain } from '../../index';
import { ViewProperties, ViewStyle } from '@blueeast/bluerain-ui-interfaces';
import React from 'react';

export interface ComponentStateButtonProps extends ViewProperties {
	/**
	 * Button Component, if provided, other button props will be ignored
	 */
	button?: React.ComponentType;

	/**
	 * Button title
	 */
	buttonTitle?: string;

	/**
	 * Button styles
	 */
	buttonStyle?: ViewStyle;

	/**
	 * Button onPress handler
	 */
	buttonOnPress?: Function;

	bluerain: BlueRain;
}

const ComponentStateButton = (props: ComponentStateButtonProps) => {

	const {
		button: ButtonComponent,
		buttonTitle,
		buttonOnPress,
		buttonStyle,
		bluerain: BR
	} = props;

	if (ButtonComponent) {

		return (<ButtonComponent />);

	} else if (buttonTitle) {

		const stylesheet = {
			marginTop: 10,
			...buttonStyle
		};

		return (
			<BR.Components.Button onPress={buttonOnPress} style={stylesheet}>
				<BR.Components.Text>
					{buttonTitle}
				</BR.Components.Text>
			</BR.Components.Button>
		);

	} else {
		return null;
	}
};

export default withBlueRain(ComponentStateButton);
