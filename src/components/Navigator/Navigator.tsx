import { MaybeThunk, resolveThunk } from '../../utils';
import { BlueBase } from '../../BlueBase';
import { BlueBaseContext } from '../../Context';
import React from 'react';

export interface NavigationOptions {
	//   title?: string;
	//   header?:
	//   | React.ReactElement<any>
	//   | ((headerProps: HeaderProps) => React.ReactElement<any>)
	//   | null;
	//   headerTransparent?: boolean;
	//   headerTitle?: string | React.ReactElement<any>;
	//   headerTitleStyle?: StyleProp<TextStyle>;
	//   headerTitleAllowFontScaling?: boolean;
	//   headerTintColor?: string;
	//   headerLeft?:
	//   | React.ReactElement<any>
	//   | ((backButtonProps: HeaderBackButtonProps) => React.ReactElement<any>)
	//   | null;
	//   headerBackTitle?: string | null;
	//   headerBackImage?: React.ReactElement<any>;
	//   headerTruncatedBackTitle?: string;
	//   headerBackTitleStyle?: StyleProp<TextStyle>;
	//   headerPressColorAndroid?: string;
	//   headerRight?: React.ReactElement<any> | null;
	//   headerStyle?: StyleProp<ViewStyle>;
	//   headerForceInset?: HeaderForceInset;
	//   headerBackground?: React.ReactNode | React.ReactType;
	//   gesturesEnabled?: boolean;
	//   gestureResponseDistance?: { vertical?: number; horizontal?: number };
	//   gestureDirection?: 'default' | 'inverted';
	[key: string]: any,
}

export interface RouteConfig {

	/** Name of route */
	name: string,

	/** Screen component */
	screen: React.ComponentType<any> | string,

	/** URL */
	path: string,

	/** Should route match exact path pattern? */
	exact?: boolean,

	/** Navigation options */
	navigationOptions?: MaybeThunk<NavigationOptions>,

	[key: string]: any,
}

export interface NavigatorProps {

	/**
	 * Defaults to 'switch'
	 */
	type?: 'switch' | 'stack' | string,

	routes: MaybeThunk<RouteConfig[]>,

	initialRouteName?: string,

	defaultNavigationOptions?: NavigationOptions,

	[key: string]: any,
}

/**
 * 🔀 Navigator
 *
 * This is a stub component. Intended to be replaced by an external router plugin.
 */
export class Navigator extends React.PureComponent<NavigatorProps> {

	static contextType = BlueBaseContext;

	render() {

		const BB: BlueBase = this.context;

		const routes = resolveThunk<RouteConfig[]>(this.props.routes, BB);

		const route = routes[0];

		if (!route) {
			return null;
		}

		const Component = (typeof route.screen === 'string')
			? BB.Components.resolve(route.screen)
			: route.screen;

		return <Component key={route.name} />;
	}
}