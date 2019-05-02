/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import { View, StyleSheet } from "react-native"
import  React from "react"
import { BlueBaseImage } from "../../getComponent"
import { ImageBackgroundProps } from '@bluebase/components'


/**
 * Very simple drop-in replacement for <Image> which supports nesting views.
 *
 * ```ReactNativeWebPlayer
 * import React, { Component } from 'react';
 * import { AppRegistry, View, ImageBackground, Text } from 'react-native';
 *
 * class DisplayAnImageBackground extends Component {
 *   render() {
 *     return (
 *       <ImageBackground
 *         style={{width: 50, height: 50}}
 *         source={{uri: 'https://facebook.github.io/react-native/img/opengraph.png'}}
 *       >
 *         <Text>React</Text>
 *       </ImageBackground>
 *     );
 *   }
 * }
 *
 * // App registration and rendering
 * AppRegistry.registerComponent('DisplayAnImageBackground', () => DisplayAnImageBackground);
 * ```
 */


 /**
 * # 🏠 ImageBackground
 *
 * ## Usage
 * ```jsx
 * <ImageBackground/>
 * ```
 */

class ImageBackground extends React.Component<ImageBackgroundProps> {
  

  render() {
    const { children, style, imageStyle, imageRef, ...props} = this.props;

    return (
      <View
        accessibilityIgnoresInvertColors={true}
        style={style}
        >
        <BlueBaseImage
        source={props.source}
       
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
              width: style.width,
              height: style.height,
             
            },
            imageStyle,
          ]}
        //  ref={imageRef}
        />
      </View>
    );
  }
}

export {ImageBackground} 
