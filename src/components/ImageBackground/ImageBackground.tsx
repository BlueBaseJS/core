import { BlueRain, withBlueRain } from '../../index';
import { ImageProperties, ImageStyle, ViewStyle } from '@blueeast/bluerain-ui-interfaces';
import React from 'react';

export interface ImageBackgroundProperties extends ImageProperties {
	style?: ViewStyle;
	imageStyle?: ImageStyle;
	children?: React.ReactNode[];
	backgroundColor?: string;
}

/**
 * Very simple drop-in replacement for <Image> which supports nesting views.
 */
const ImageBackground = (props: ImageBackgroundProperties & { bluerain: BlueRain }) => {

	const { bluerain: BR, children, ...others } = props;
	const style = props.style || {};

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
	const imageStyleSheet = [imageStyle, props.imageStyle || {}];

	return (
		<BR.Components.View style={style}>
			<BR.Components.Image {...others} style={imageStyleSheet} />
			{children}
		</BR.Components.View>
	);
};

export default withBlueRain(ImageBackground);
