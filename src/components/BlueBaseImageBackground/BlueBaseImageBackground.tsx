/* eslint-disable react/prop-types */
import { BlueBaseImageProps, ImageBackgroundProps } from '@bluebase/components';
import React, { ReactNode, useContext } from 'react';
import { ImageBackground as RNImageBackground, ImageSourcePropType } from 'react-native';

import { BlueBase } from '../../BlueBase';
import { resolveImageSource } from '../../components/BlueBaseImage';
import { BlueBaseContext, ThemeContextData } from '../../contexts';
import { useTheme } from '../../hooks';

// tslint:disable: jsdoc-format
/**
 * # 🖼 BlueBaseImageBackground
 *
 * A drop in replacement for React Native's ImageBackground component.
 * Adds ability to display image stored in BlueBase Asset Registry.
 *
 * ## Usage
 * ```jsx
<BlueBaseImageBackground resolve="Logo"><Content /></BlueBaseImageBackground>
<BlueBaseImageBackground resolve={['LogoSquare', 'Logo']}><Content /></BlueBaseImageBackground>
```
 */
interface BlueBaseImageBackgroundProps extends Omit<ImageBackgroundProps, 'source'> {
	source: ImageSourcePropType | string | string[];
	children?: ReactNode;
}
export const BlueBaseImageBackground = (props: BlueBaseImageBackgroundProps): any => {
	const { source: _source, ...rest } = props;
	const BB: BlueBase = useContext(BlueBaseContext);
	const Theme: ThemeContextData = useTheme();
	const source = resolveImageSource(props as BlueBaseImageProps, BB, Theme);

	if (!source) {
		return props.children;
	}

	return React.createElement(RNImageBackground, { ...rest, source });
};
