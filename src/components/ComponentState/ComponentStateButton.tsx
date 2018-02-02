import { BlueRainType,withBlueRain } from '../../index';
import { ImageStyle, TextStyle,ViewProperties,ViewStyle } from '@blueeast/bluerain-ui-interfaces';
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

	bluerain: BlueRainType;
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
     	console.log(BR);
		const Button = BR.Components.get('Button');
		const Text = BR.Components.get('Text');

		const stylesheet = {
			marginTop: 10,
			...buttonStyle
		};

		return (
			<Button onPress={buttonOnPress} style={BR.Utils.createStyleSheet(stylesheet)}>
				<Text>{buttonTitle}</Text>
			</Button>
		);

	} else {
		return null;
	}
};

export default withBlueRain(ComponentStateButton);
