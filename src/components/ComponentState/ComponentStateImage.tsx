import { BlueRain, withBlueRain } from '../../index';
import { ImageStyle, ViewProperties, ViewStyle } from '@blueeast/bluerain-ui-interfaces';
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

	bluerain: BlueRain;
}

const ComponentStateImage = (props: ComponentStateImageProps) => {
	const {
		image: ImageComponent,
		imageSource,
		imageStyle,
		bluerain: BR
	} = props;

	// Image
	let ImageC;

	if (ImageComponent || imageSource) {
		ImageC = ImageComponent || BR.Components.Image;

	} else {
		return null;
	}

	// Styles
	const stylesheet = { marginBottom: 10 };

	return (
  <BR.Components.View style={stylesheet}>
		<ImageC
			style={{
				width: 327,
				height: 250,
				...imageStyle
			}}
			source={imageSource}
		/>
  </BR.Components.View>
	);
};

export default withBlueRain(ComponentStateImage);
