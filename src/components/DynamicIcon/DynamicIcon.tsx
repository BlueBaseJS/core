import { BlueBase } from '../../BlueBase';
import { BlueBaseContext } from '../../contexts';
import { DynamicIconProps } from '@bluebase/components';
import React from 'react';

/**
 * # 🗿 DynamicIcon
 *
 * An enhanced Icon that can render any of the following:
 * - BB.Components.Icon
 * - BB.Components.Image
 * - A custom component
 *
 * ## Usage
 * ```jsx
 * <DynamicIcon type="image" size={250} source={{ uri: 'https://picsum.photos/200' }} />
 * ```
 */

export class DynamicIcon extends React.PureComponent<DynamicIconProps> {
	static contextType: React.Context<BlueBase> = BlueBaseContext;

	public static defaultProps: Partial<DynamicIconProps> = {
		size: 100,
	};

	render() {
		const BB: BlueBase = this.context;

		const { type, component: Component, name, source, ...other } = this.props;
		const rest = { ...other };

		let component: React.ComponentType<any>;

		if (!rest.style) {
			rest.style = {};
		}

		if (type === 'component' && Component) {
			component =
				typeof Component === 'string' ? BB.Components.resolve(Component) : (component = Component);
		} else if (type === 'icon' && name) {
			component = BB.Components.resolve('Icon');
			rest.name = name;
		} else if (type === 'image' && source) {
			component = BB.Components.resolve('Image');
			rest.source = source;

			rest.style.width = Number(rest.size);
			rest.style.height = Number(rest.size);
		} else {
			return null;
		}

		rest.size = Number(rest.size);

		return React.createElement(component, rest);
	}
}
