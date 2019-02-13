import React from 'react';
import { RouteConfigBase } from '../RouteAsync';
import { getComponent } from '../../getComponent';

export interface RouteProps extends RouteConfigBase {
	routes?: RouteProps[]
}

/**
 * 🔀 RouterProvider
 *
 * This is a stub component. Intended to be replaced by an external router plugin.
 * This component (or RouteAsync) shiould be used recusrsively to render nested routes.
 */
export const Route = (props: RouteProps) => {

	const { component, ...rest } = props;

	let Component: React.ComponentType;

	// Return null, if there is no component prop
	if (!component) {
		return null;
	}
	// If component prop is a string, resolve component from BlueBase
	else if (typeof component === 'string') {
		Component = getComponent(component);
	}
	// Use component as is
	else {
		Component = component;
	}

	const RouteAsync = getComponent('RouteAsync');

	// Render component
	return (
		<Component>
			{props.routes ? <RouteAsync {...rest} /> : null}
		</Component>
	);
};