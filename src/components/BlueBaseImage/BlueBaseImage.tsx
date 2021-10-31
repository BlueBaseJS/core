/* eslint-disable react/prop-types */
import { BlueBaseImageProps, ImageProps } from '@bluebase/components';
import React from 'react';

import { BlueBase } from '../../BlueBase';
import { ThemeContextData } from '../../contexts';
import { useBlueBase, useComponent, useTheme } from '../../hooks';
import { isMobile } from '../../utils';

// tslint:disable: jsdoc-format
/**
 * # 🖼 BlueBaseImage
 *
 * A drop in replacement for React Native's Image component.
 * Adds ability to display image stored in BlueBase Asset Registry.
 *
 * ## Usage
 * ```jsx
<BlueBaseImage resolve="Logo" />
<BlueBaseImage resolve={['LogoSquare', 'Logo']} />
```
 */
//
export const BlueBaseImage = (props: BlueBaseImageProps) => {
	const { resolve, source: _source, ...rest } = props;

	const BB = useBlueBase();
	const Image = useComponent<ImageProps>('Image');

	const Theme: ThemeContextData = useTheme();

	const source = resolveImageSource(props, BB, Theme);
	if (!source) {
		return null;
	}

	return React.createElement(Image, { ...rest, source });
};

const getAssetVersions = (source: BlueBaseImageProps['source'], Theme: ThemeContextData) => {
	if (typeof source !== 'string') {
		return source;
	}

	const { theme }: ThemeContextData = Theme;

	// desktop or mobile
	const screen = isMobile() ? 'mobile' : 'desktop';

	// dark or light mode
	const mode = theme.mode;

	return [`${source}_${screen}_${mode}`, `${source}_${screen}`, `${source}_${mode}`, source];
};

export const resolveImageSource = (
	props: BlueBaseImageProps,
	BB: BlueBase,
	Theme: ThemeContextData
) => {
	const { resolve } = props;
	const _source: BlueBaseImageProps['source'] = getAssetVersions(props.source, Theme);
	let Asset;

	if (typeof _source === 'string') {
		Asset = BB.Assets.resolve(_source);
	} else if (Array.isArray(_source)) {
		const keys = (_source as string[]).filter((s: string) => typeof s === 'string');

		if (keys.length > 0) {
			Asset = BB.Assets.resolve(...keys);
		}
	} else if (resolve) {
		BB.Logger.warn('resolve prop in BlueBaseImage is deprecated. Use "source" instead');

		Asset = Array.isArray(resolve) ? BB.Assets.resolve(...resolve) : BB.Assets.get(resolve);
	}

	if ((typeof _source === 'string' || Array.isArray(_source) || resolve) && !Asset) {
		return null;
	}

	const source = Asset ? Asset.value : (_source as ImageProps['source']);
	return source;
};
