import React from 'react';
import { ViewProperties, ImageStyle, ViewStyle, TextStyle } from '@blueeast/bluerain-ui-interfaces';
import { BlueRainType } from '../../index';

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

export default ComponentStateText;
