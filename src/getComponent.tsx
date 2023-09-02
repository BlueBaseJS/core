import React from 'react';

import { useBlueBase } from './hooks';

/**
 * Resolves a component from BlueBase context, and returns it.
 * It is possible to pass multiple keys as backup. So if one component
 * is not found, the function will fallback and try to find next component.
 *
 * @param keys
 */
export function getComponent<T = any>(
	...keys: Array<string | React.ComponentType<any>>
): React.ComponentType<T> {
	if (keys.length === 0) {
		throw Error('getComponent method needs at least one key');
	}

	const displayName = keys.join('_');

	const BlueBaseComponent = (props: T) => {
		const BB = useBlueBase();

		// If there is no BlueBase context, throw an Error
		if (!BB) {
			throw Error(
				// eslint-disable-next-line max-len
				`Could not resolve component "${displayName}" in "getComponent" command. Reason: BlueBase context not found.`
			);
		}

		return React.createElement(BB.Components.resolveFromCache<T>(...(keys as any)) as any, props as any);
	};

	BlueBaseComponent.displayName = displayName;
	return BlueBaseComponent;
}
