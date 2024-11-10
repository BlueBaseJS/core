import { DynamicIconProps } from '@bluebase/components';
import React, { useContext } from 'react';

import { BlueBase } from '../../BlueBase';
import { BlueBaseContext } from '../../contexts';

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

export const DynamicIcon: React.FC<DynamicIconProps> = ({
	type,
	component: Component,
	name,
	source,
	size = 100,
	...other
}) => {
	const BB = useContext(BlueBaseContext) as BlueBase;
	const rest: any = { ...other, size: Number(size) };

	let component: React.ComponentType<any>;

	if (!rest.style) {
		rest.style = {};
	}

	if (type === 'component' && Component) {
		component =
			typeof Component === 'string' ? BB.Components.resolve(Component) : Component;
	} else if (type === 'icon' && name) {
		component = BB.Components.resolve('Icon');
		rest.name = name;
	} else if (type === 'image' && source) {
		component = BB.Components.resolve('Image');
		rest.source = source;
		rest.style.width = Number(size);
		rest.style.height = Number(size);
	} else {
		return null;
	}

	return React.createElement(component, rest);
};

DynamicIcon.displayName = 'DynamicIcon';
export default DynamicIcon;
