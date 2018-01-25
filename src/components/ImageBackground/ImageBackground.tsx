import React from 'react';
import { ImageProperties, ImageStyle, ViewStyle } from 'react-native';
import { withBlueRain, BlueRainType } from '../../index';

export interface ImageBackgroundProperties extends ImageProperties {
	style?: ViewStyle;
	imageStyle?: ImageStyle;
	children?: React.ReactNode[];
	backgroundColor?: string;
}

/**
 * Very simple drop-in replacement for <Image> which supports nesting views.
 */
const ImageBackground = (props: ImageBackgroundProperties & { bluerain: BlueRainType }) => {

	const { bluerain: BR, children, ...others } = props;
	const style = props.style || {};

	const View = BR.Components.get('View');
	const Image = BR.Components.get('Image');

	const imageStyle = {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,

		// Temporary Workaround:
		// Current (imperfect yet) implementation of <Image> overwrites width and height styles
		// (which is not quite correct), and these styles conflict with explicitly set styles
		// of <ImageBackground> and with our internal layout model here.
		// So, we have to proxy/reapply these styles explicitly for actual <Image> component.
		// This workaround should be removed after implementing proper support of
		// intrinsic content size of the <Image>.
		width: style.width,
		height: style.height,
	};

	if (props.backgroundColor) {
		style.backgroundColor = props.backgroundColor;
	}

	const imageStyleSheet = BR.Utils.createStyleSheet([imageStyle, props.imageStyle]);

	return (
		<View style={BR.Utils.createStyleSheet(style)}>
			<Image {...others} style={imageStyleSheet} />
			{children}
		</View>
	);
};

export default withBlueRain(ImageBackground);
