import { MaybePromise, getDefinitePromise, isPromise } from '../../utils';
import Loadable from 'react-loadable';
import React from 'react';
import { ReactLoadableLoading } from '..';
import { getComponent } from '../../getComponent';

export interface RouteConfigBase {
	navigator?: 'switch' | 'stack' | string,
	name: string,
	component?: React.ComponentType<any> | string,
	path: string,
	exact?: boolean,
	navigationOptions?: any,
	// routes?: MaybePromise<RouteAsyncProps[]>

	[key: string]: any,
}

export interface RouteAsyncProps extends RouteConfigBase {
	routes?: MaybePromise<RouteAsyncProps[]>
}

/**
 * 🔀 RouteAsync
 *
 * If routes property is a promise, resolves it and passed on to the the Route
 * component.
 *
 * TODO: maybe this should be a react hook
 */
export const RouteAsync = (props: RouteAsyncProps) => {

	const { routes, ...rest } = props;
	const Route = getComponent('Route');

	if (!routes || !isPromise(routes)) {
		return <Route {...props} />;
	}

	const RouteInternal = Loadable({
		loader: () => getDefinitePromise(routes),
		loading: ReactLoadableLoading,
		render: (loadedRoutes) => {

			return <Route routes={[loadedRoutes]} {...rest} />;
		}
	});

	return <RouteInternal />;
};