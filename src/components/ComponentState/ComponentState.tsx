
import { BlueRain, withBlueRain } from '../../index';
import {  ImageStyle,TextStyle,ViewProperties,ViewStyle } from '@blueeast/bluerain-ui-interfaces';
import ComponentStateButton from './ComponentStateButton';
import ComponentStateImage from './ComponentStateImage';
import ComponentStateText from './ComponentStateText';
import React from 'react';

export interface ComponentStateProps extends ViewProperties {
	/**
	 * Image Component, if provided, imageSource will be ignored
	 */
	image?: React.ComponentType;

	/**
	 * Image styles
	 */
	imageStyle?: ImageStyle;

	/**
	 * Image source
	 */
	imageSource?: string;

	/**
	 * Title text
	 */
	title: string;

	/**
	 * Title style
	 */
	titleStyle?: TextStyle;

	/**
	 * Description Text
	 */
	description: string;

	/**
	 * Description style
	 */
	descriptionStyle?: TextStyle;

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

	style?: ViewStyle
}

const ComponentState = (props: ComponentStateProps & { bluerain: BlueRain }) => {
	const {
		title,
		titleStyle,
		description,
		descriptionStyle,
		bluerain: BR
	} = props;

	const style = {
		alignItems: 'center',
		padding: 16,
		...props.style
	};

	const titleStylesheet = {
		fontSize: 18,
		// fontWeight: 'bold',
		...titleStyle
 	};

	return (
  <BR.Components.View style={BR.Utils.createStyleSheet(style)}>
    <ComponentStateImage  {...props}  />
    <ComponentStateText text={title} style={titleStylesheet} bluerain={BR} />
    <ComponentStateText text={description} style={descriptionStyle} bluerain={BR} />
    <ComponentStateButton {...props} />
  </BR.Components.View>
	);
};

export default withBlueRain(ComponentState);
