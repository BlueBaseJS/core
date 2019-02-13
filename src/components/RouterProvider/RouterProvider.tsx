import React from 'react';
import { RouteAsyncProps } from '../RouteAsync';
import { getComponent } from '../../getComponent';

/**
 * Props for the Router component
 */
export interface RouterProviderProps {
	routes: RouteAsyncProps,
	path?: string,

	[key: string]: any,
}

/**
 * 🔀 RouterProvider
 *
 * This is a stub router. Intended to be replaced by an external router plugin.
 */
export const RouterProvider = (props: RouterProviderProps) => {

	const RouteAsync = getComponent('RouteAsync');
	return <RouteAsync {...props.routes} />;

};