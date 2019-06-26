import { NavigationProps, RouteConfig } from '@bluebase/components';

import { BlueBase } from '../../BlueBase';
import { BlueBaseContext } from '../../Context';
import React from 'react';
import { resolveThunk } from '../../utils';

/**
 * 🔀 Navigation
 *
 * This is a stub router. Intended to be replaced by an external router plugin.
 */
// export const Navigation = ({ component: Component }: NavigationProps) => (<Component />);

export class Navigation extends React.PureComponent<NavigationProps> {
	static contextType = BlueBaseContext;

	render() {
		const BB: BlueBase = this.context;

		const routes = resolveThunk<RouteConfig[]>(this.props.navigator.routes, BB) || [];

		const route = routes[0];

		if (!route) {
			return null;
		}

		const Screen =
			typeof route.screen === 'string' ? BB.Components.resolve(route.screen) : route.screen;

		let navigator = null;

		if (route.navigator) {
			navigator = <Navigation navigator={route.navigator} />;
		}

		if (route.screen) {
			const Component = Screen!;
			return <Component key={route.name}>{navigator}</Component>;
		}

		return navigator;
	}
}
