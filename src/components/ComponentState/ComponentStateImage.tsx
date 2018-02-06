import { BlueRainType ,withBlueRain } from '../../index';
import { ImageStyle,TextStyle,ViewProperties , ViewStyle } from '@blueeast/bluerain-ui-interfaces';
import React from 'react';

export interface ComponentStateImageProps extends ViewProperties {
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

	style?: ViewStyle;

	bluerain: BlueRainType;
}

const ComponentStateImage = (props: ComponentStateImageProps) => {
	const {
		image: ImageComponent,
		imageSource,
		imageStyle,
		bluerain: BR
	} = props;

	const View = BR.Components.get('View');
	const Image = BR.Components.get('Image');

	// Image
	let ImageC;

	if (ImageComponent || imageSource) {
		ImageC = ImageComponent || Image;

	} else {
		return null;
	}

	// Styles
	const stylesheet = { marginBottom: 10, maxWidth: 200 };

	return (
  <View style={BR.Utils.createStyleSheet(stylesheet)}>
		<ImageC
			style={imageStyle ? BR.Utils.createStyleSheet(imageStyle) : {}}
			source={imageSource}
		/>
  </View>
	);
};

export default withBlueRain(ComponentStateImage);
