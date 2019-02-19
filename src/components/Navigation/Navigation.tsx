import { MaybeThunk, resolveThunk } from '../../utils';
import { BlueBase } from '../../BlueBase';
import { BlueBaseContext } from '../../Context';
import React from 'react';


export interface NavigationOptions {
	title?: string;
	// header?:
	// | React.ReactElement<any>
	// | ((headerProps: HeaderProps) => React.ReactElement<any>)
	// | null;
	// headerTransparent?: boolean;
	// headerTitle?: string | React.ReactElement<any>;
	// headerTitleStyle?: StyleProp<TextStyle>;
	// headerTitleAllowFontScaling?: boolean;
	// headerTintColor?: string;
	// headerLeft?:
	// | React.ReactElement<any>
	// | ((backButtonProps: HeaderBackButtonProps) => React.ReactElement<any>)
	// | null;
	// headerBackTitle?: string | null;
	// headerBackImage?: React.ReactElement<any>;
	// headerTruncatedBackTitle?: string;
	// headerBackTitleStyle?: StyleProp<TextStyle>;
	// headerPressColorAndroid?: string;
	// headerRight?: React.ReactElement<any> | null;
	// headerStyle?: StyleProp<ViewStyle>;
	// headerForceInset?: HeaderForceInset;
	// headerBackground?: React.ReactNode | React.ReactType;
	// gesturesEnabled?: boolean;
	// gestureResponseDistance?: { vertical?: number; horizontal?: number };
	// gestureDirection?: 'default' | 'inverted';
	[key: string]: any,
}

export interface RouteConfig {

	/** Name of route */
	name: string,

	/** Screen component */
	screen?: React.ComponentType<any> | string,

	/** URL */
	path: string,

	/** Should route match exact path pattern? */
	exact?: boolean,

	/** Navigation options */
	navigationOptions?: MaybeThunk<NavigationOptions>,

	/** FIXME: Experimental */
	navigator?: NavigatorProps,

	[key: string]: any,
}

export interface NavigatorProps {

	/**
	 * Defaults to 'switch'
	 */
	type?: 'switch' | 'stack' | string,

	/**
	 * Routes
	 */
	routes: MaybeThunk<RouteConfig[]>,

	/**
	 * [Stack Navigator] Sets the default screen of the navigator.
	 * Must match one of the keys in route configs.
	 */
	initialRouteName?: string,

	/**
	 * Default navigation options to use for screens.
	 */
	defaultNavigationOptions?: MaybeThunk<NavigationOptions>,

	/**
	 * Defines the style for rendering and transitions:
	 *
	 * - `card` - Use the standard iOS and Android screen transitions. This is the default.
	 * - `modal` - Make the screens slide in from the bottom which is a common iOS pattern.
	 * Only works on iOS, has no effect on Android.
	 */
	mode?: 'card' | 'modal',

	/**
	 * Specifies how the header should be rendered:
	 *
	 * - `float` - Render a single header that stays at the top and animates as screens
	 * are changed. This is a common pattern on iOS.
	 * - `screen` - Each screen has a header attached to it and the header fades in and
	 * out together with the screen. This is a common pattern on Android.
	 * - `none` - No header will be rendered.
	 */
	headerMode?: 'float' | 'screen' | 'none',

	[key: string]: any,
}


/**
 * Props for the Router component
 */
export interface NavigationProps {
	navigator: NavigatorProps,

	[key: string]: any,
}

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

		if (route.screen) {
			const Component = (typeof route.screen === 'string')
				? BB.Components.resolve(route.screen)
				: route.screen;

			return <Component key={route.name} />;
		}

		if (route.navigator) {
			return <Navigation navigator={route.navigator} />;
		}

		return null;
	}
}