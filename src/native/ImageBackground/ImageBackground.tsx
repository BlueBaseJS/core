/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
import { StyleSheet, View } from 'react-native';
import { ImageBackgroundProps } from '@bluebase/components';
import  React from 'react';
import  {BlueBaseImage}  from  '../../components/BlueBaseImage';
/**
 * # 🏠 ImageBackground
 *
 * ## Usage
 * ```jsx
 *  <ImageBackground/>
 * ```
 */

class ImageBackground extends React.Component<ImageBackgroundProps> {

	// _viewRef: ?React.ElementRef<typeof View> = null;
	// setNativeProps(props: Object) {
  //   // Work-around flow
	// 	const viewRef = this._viewRef;
	// 	if (viewRef) {
	// 		ensureComponentIsNative(viewRef);
	// 		viewRef.setNativeProps(props);
	// 	}
	// }

	// _captureRef = ref => {
	// 	this._viewRef = ref;
	// }

	render() {
		const { children, style, imageStyle, imageRef, ...props } = this.props;

		return (
      <View
        accessibilityIgnoresInvertColors={true}
        style={style}
        // ref={this._captureRef}
        >
        <BlueBaseImage
          {...props}
          style={[
	StyleSheet.absoluteFill,
	{
              // Temporary Workaround:
              // Current (imperfect yet) implementation of <Image> overwrites width and height styles
              // (which is not quite correct), and these styles conflict with explicitly set styles
              // of <ImageBackground> and with our internal layout model here.
              // So, we have to proxy/reapply these styles explicitly for actual <Image> component.
              // This workaround should be removed after implementing proper support of
              // intrinsic content size of the <Image>.
		width: style && (style as any).width,
		height: style && (style as any).height,
	},
	imageStyle,
]}
          // ref={imageRef}
        />
        {children}
      </View>
		);
	}
}




// class ImageBackground extends React.Component<ImageBackgroundProps> {


// 	render() {
// 		const { children, style, imageStyle, imageRef, ...props } = this.props;

// 		return (
//       <View
//         accessibilityIgnoresInvertColors={true}
//         style={style}
//         >
//         <Image
//         source={props.source}

//           {...props}
//           style={[
// 	StyleSheet.absoluteFill,
// 	{
//               // Temporary Workaround:
//               // Current (imperfect yet) implementation of <Image> overwrites width and height styles
//               // (which is not quite correct), and these styles conflict with explicitly set styles
//               // of <ImageBackground> and with our internal layout model here.
//               // So, we have to proxy/reapply these styles explicitly for actual <Image> component.
//               // This workaround should be removed after implementing proper support of
//               // intrinsic content size of the <Image>.
// 		width: style && (style as any).width,
// 		height: style && (style as any).height,

// 	},
// 	imageStyle,
// ]}
//         //  ref={imageRef}
//         />
//       </View>
// 		);
// 	}
// }

export { ImageBackground };
