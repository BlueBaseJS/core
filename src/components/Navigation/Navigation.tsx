import { NavigationProps, RouteConfig } from '@bluebase/components';
import React, { useContext } from 'react';

import { BlueBase } from '../../BlueBase';
import { BlueBaseContext, NavigationContext, StubNavigationActionsObject } from '../../contexts';
import { resolveThunk } from '../../utils';

/**
 * 🔀 Navigation
 *
 * This is a stub router. Intended to be replaced by an external router plugin.
 */
export const Navigation: React.FC<NavigationProps> = ({ navigator }) => {
	const BB = useContext(BlueBaseContext) as BlueBase;

	const routes = resolveThunk<RouteConfig[]>(navigator.routes, BB) || [];
	const route = routes[0];

	if (!route) {
		return null;
	}

	const Screen =
		typeof route.screen === 'string' ? BB.Components.resolve(route.screen) : route.screen;

	let navigatorNode = null;

	if (route.navigator) {
		navigatorNode = <Navigation navigator={route.navigator} />;
	}

	let node = navigatorNode;

	if (route.screen) {
		const Component = Screen!;
		node = <Component key={route.name}>{navigatorNode}</Component>;
	}

	return (
		<NavigationContext.Provider value={StubNavigationActionsObject}>
			{node}
		</NavigationContext.Provider>
	);
};

Navigation.displayName = 'Navigation';
export default Navigation;
