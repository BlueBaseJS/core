import { BlueBase } from '../../BlueBase';
import { BlueBaseConsumer } from '../../Context';
import React from 'react';

export interface DynamicIconProps {

	/**
	 * If value is:
	 *
	 * - component: Icon is a custom component, and looks for 'component' prop
	 * - name: Icon is an instance of BB.Components.Icon and looks for 'name' prop
	 * - image: Icon is an instance of BB.Components.Image and looks for 'source' prop
	 */
	type: 'component' | 'name' | 'image';

	/**
	 * Used when type is 'component'.
	 * Either a component or a component name (string).
	 * In case of string, it will be fetched from Component Registry.
	 */
	component?: React.ComponentType<any> | string;

	/**
	 * Used when type is 'name'.
	 * The name prop of the BB.Components.Icon component
	 */
	name?: string;

	/**
	 * Used when type is 'image'.
	 * The image source
	 */
	source?: string;

	/**
	 * Icon size. Defaults to 100
	 */
	size?: number;

	[key: string]: any;
}

/**
 * An enhanced Icon that can render any of the following:
 * - BB.Components.Icon
 * - BB.Components.Image
 * - A custom component
 */
const DynamicIcon: React.ComponentType<DynamicIconProps> = (props) => {
	const { type, component: Component, name, source, ...rest } = props;

	return (
		<BlueBaseConsumer>
			{(BB: BlueBase) => {
				let component: React.ComponentType<any>;

				if (type === 'component' && Component) {
					component = (typeof Component === 'string')
						? BB.Components.resolve(Component)
						: component = Component;

				} else if (type === 'name' && name) {
					component = BB.Components.resolve('Icon');
					rest.name = name;

				} else if (type === 'image' && source) {
					component = BB.Components.resolve('Image');
					rest.source = source;

					if (!rest.style) {
						rest.style = {};
					}

					if (rest.size) {
						rest.style.width = rest.size;
						rest.style.height = rest.size;
					}
				} else {
					return null;
				}

				return React.createElement(component, rest);
			}}
		</BlueBaseConsumer>
	);
};

DynamicIcon.defaultProps = { size: 100 };

export {
	DynamicIcon
};
