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

		let Asset;

		if (resolve) {
			Asset = Array.isArray(resolve)
			? BB.Assets.resolve(...resolve)
			: BB.Assets.get(resolve);
		}

		const source = Asset ? Asset.value : _source as ImageProps['source'];

		return React.createElement(Image, { ...rest, source });
	}
}
