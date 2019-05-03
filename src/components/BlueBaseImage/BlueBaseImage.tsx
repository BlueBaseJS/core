import { BlueBaseImageProps, ImageProps } from '@bluebase/components';
import { BlueBase } from '../../BlueBase';
import { BlueBaseContext } from '../../Context';
import { Image } from '../../getComponent';
import React from 'react';


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
export class BlueBaseImage extends React.PureComponent<BlueBaseImageProps> {

	static contextType = BlueBaseContext;

	public static defaultProps = {
		args: {}
	};

	render() {

		const { resolve, source: _source, ...rest } = this.props;
		const BB: BlueBase = this.context;

		const source = resolveImageSource(this.props, BB);

		if (source === null) {
			return null;
		}

		return React.createElement(Image, { ...rest, source });
	}
}

export const resolveImageSource = (props: BlueBaseImageProps, BB: BlueBase) => {

	const { resolve, source: _source } = props;

	let Asset;

	if (typeof _source === 'string') {
		Asset = BB.Assets.resolve(_source);
	}
	else if (Array.isArray(_source)) {

		const keys = (_source as string[]).filter(s => typeof s === 'string');

		if (keys.length > 0) {
			Asset = BB.Assets.resolve(...keys);
		}
	}
	else if (resolve) {
		BB.Logger.warn('resolve prop in BlueBaseImage is deprecated. Use "source" instead');

		Asset = Array.isArray(resolve)
		? BB.Assets.resolve(...resolve)
		: BB.Assets.get(resolve);
	}

	if ((typeof _source === 'string' || Array.isArray(_source) || resolve) && !Asset) {
		return null;
	}

	const source = Asset ? Asset.value : _source as ImageProps['source'];

	return source;
};
