import { BlueBaseImageProps, ImageBackgroundProps } from '@bluebase/components';

import { BlueBase } from '../../BlueBase';
import { BlueBaseContext } from '../../Context';
import { ImageBackground as RNImageBackground } from 'react-native';
import React from 'react';
import { resolveImageSource } from '../../components';

// tslint:disable: jsdoc-format
/**
 * # 🖼 ImageBackground
 *
 * A drop in replacement for React Native's ImageBackground component.
 * Adds ability to display image stored in BlueBase Asset Registry.
 *
 * ## Usage
 * ```jsx
<ImageBackground resolve="Logo"><Content /></ImageBackground>
<ImageBackground resolve={['LogoSquare', 'Logo']}><Content /></ImageBackground>
```
 */
export class ImageBackground extends React.PureComponent<ImageBackgroundProps> {
	static contextType = BlueBaseContext;

	public static defaultProps = {
		args: {},
	};

	render() {
		const { source: _source, ...rest } = this.props;
		const BB: BlueBase = this.context;

		const source = resolveImageSource(this.props as BlueBaseImageProps, BB);

		if (!source) {
			return this.props.children;
		}

		return React.createElement(RNImageBackground, { ...rest, source });
	}
}
