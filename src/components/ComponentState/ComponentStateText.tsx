import { BlueRain,withBlueRain } from '../../index';
import { TextStyle } from '@blueeast/bluerain-ui-interfaces';
import React from 'react';

export interface ComponentStateTextProps {
	/**
	 * Text
	 */
	text: string;

	/**
	 * Style Object
	 */
	style?: TextStyle;

	bluerain: BlueRain;
}

const ComponentStateText = (props: ComponentStateTextProps) => {

	const {
		text,
		style,
		bluerain: BR
	} = props;

	if (text) {

		return (
			<BR.Components.Text style={style ? BR.Utils.createStyleSheet(style) : {}} >
				{text}
			</BR.Components.Text>
		);

	} else {
		return null;
	}
};

export default withBlueRain(ComponentStateText) as React.ComponentType<any>;
