import { BlueRain } from '../../BlueRain';
import { BlueRainConsumer } from '../../Context';
import React from 'react';

export interface DynamicIconProperties {

	/**
	 * If value is:
	 *
	 * - component: Icon is a custom component, and looks for 'component' prop
	 * - name: Icon is an instance of BR.Components.Icon and looks for 'name' prop
	 * - image: Icon is an instance of BR.Components.Image and looks for 'source' prop
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
	 * The name prop of the BR.Components.Icon component
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
 * - BR.Components.Icon
 * - BR.Components.Image
 * - A custom component
 */
const DynamicIcon: React.ComponentType<DynamicIconProperties> = (props) => {
	const { type, component: Component, name, source, ...rest } = props;

	return (
		<BlueRainConsumer>
			{(BR: BlueRain) => {
				let component: React.ComponentType<any>;

				if (type === 'component' && Component) {
					component = (typeof Component === 'string')
						? BR.Components.resolve(Component)
						: component = Component;

				} else if (type === 'name' && name) {
					component = BR.Components.resolve('Icon');
					rest.name = name;

				} else if (type === 'image' && source) {
					component = BR.Components.resolve('Image');
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
		</BlueRainConsumer>
	);
};

DynamicIcon.defaultProps = { size: 100 };

export {
	DynamicIcon
};
