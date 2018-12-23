import { BlueBase } from '../../BlueBase';
import { BlueBaseContext } from '../../Context';
import { ImageSourcePropType } from 'react-native';
import React from 'react';

export interface DynamicIconProps {

	/**
	 * If value is:
	 *
	 * - component: Icon is a custom component, and looks for 'component' prop
	 * - icon: Icon is an instance of BB.Components.Icon and looks for 'icon' prop
	 * - image: Icon is an instance of BB.Components.Image and looks for 'source' prop
	 */
	type: 'component' | 'icon' | 'image';

	/**
	 * Used when type is 'component'.
	 * Either a component or a component name (string).
	 * In case of string, it will be fetched from Component Registry.
	 */
	component?: React.ComponentType<any> | string;

	/**
	 * Used when type is 'icon'.
	 * The name prop of the BB.Components.Icon component
	 */
	name?: string;

	/**
	 * Used when type is 'image'.
	 * The image source
	 */
	source?: ImageSourcePropType;

	/**
	 * Icon size. Defaults to 100
	 */
	size?: number;

	[key: string]: any;
}

/**
 * 🗿 DynamicIcon
 *
 * An enhanced Icon that can render any of the following:
 * - BB.Components.Icon
 * - BB.Components.Image
 * - A custom component
 */

export class DynamicIcon extends React.PureComponent<DynamicIconProps> {

	static contextType = BlueBaseContext;

	public static defaultProps: Partial<DynamicIconProps> = {
		size: 100
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
			component = (typeof Component === 'string')
			? BB.Components.resolve(Component)
			: component = Component;

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
