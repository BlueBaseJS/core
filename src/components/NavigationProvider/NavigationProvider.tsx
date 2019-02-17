import { BlueBase } from '../../BlueBase';
import { BlueBaseContext } from '../../Context';
import { NavigatorProps } from '../Navigator';
import React from 'react';

/**
 * Props for the Router component
 */
export interface NavigationProviderProps {
	navigator: NavigatorProps,

	[key: string]: any,
}

/**
 * 🔀 NavigationProvider
 *
 * This is a stub router. Intended to be replaced by an external router plugin.
 */
// export const NavigationProvider = ({ component: Component }: NavigationProviderProps) => (<Component />);


export class NavigationProvider extends React.PureComponent<NavigationProviderProps> {

	static contextType = BlueBaseContext;

	render() {

		const BB: BlueBase = this.context;

		const Navigator = BB.Components.resolve('Navigator');

		return (<Navigator {...this.props.navigator} />);
	}
}