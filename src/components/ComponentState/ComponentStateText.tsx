import { BlueRainType ,withBlueRain } from '../../index';
import { ImageStyle,TextStyle,ViewProperties, ViewStyle } from '@blueeast/bluerain-ui-interfaces';
import React from 'react';

export interface ComponentStateTextProps extends ViewProperties {
	/**
	 * Text
	 */
	text: string;

	/**
	 * Style Object
	 */
	style?: TextStyle;

	bluerain: BlueRainType;
}

const ComponentStateText = (props: ComponentStateTextProps) => {

	const {
		text,
		style,
		bluerain: BR
	} = props;

	if (text) {

		const Text = BR.Components.get('Text');

		return (
			<Text style={style ? BR.Utils.createStyleSheet(style, 'Text') : {}} >
				{text}
			</Text>
		);

	} else {
		return null;
	}
};

export default withBlueRain(ComponentStateText);
