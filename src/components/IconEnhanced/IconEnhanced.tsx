import { BlueRain, withBlueRain } from '../../index';
import React from 'react';

export interface IconEnhancedProperties {

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
const IconEnhanced: React.ComponentType<IconEnhancedProperties & { bluerain: BlueRain }> = (props) => {
	const { type, component: Component, name, source, bluerain: BR, ...rest } = props;

	let component: React.ComponentType<any>;

	if (type === 'component' && Component) {
		component = (typeof Component === 'string')
			? BR.Components.get(Component)
			: component = Component;

	} else if (type === 'name' && name) {
		component = BR.Components.get('Icon');
		rest.name = name;

	} else if (type === 'image' && source) {
		component = BR.Components.get('Image');
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
};

IconEnhanced.defaultProps = { size: 100 };

export default withBlueRain(IconEnhanced) as React.ComponentType<IconEnhancedProperties>;
