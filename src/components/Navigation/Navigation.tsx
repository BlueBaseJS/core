import { BlueBase } from '../../BlueBase';
import { BlueBaseContext } from '../../Context';
import { NavigatorProps } from '../Navigator';
import React from 'react';

export interface NavigationProps {
	[key: string]: any,
}

/**
 * 🔀 Navigation
 *
 * This is an internal component. Not to be registered.
 *
 * TODO: Better docs
 */
export class Navigation extends React.PureComponent<NavigationProps> {

	static contextType = BlueBaseContext;

	render() {

		const BB: BlueBase = this.context;

		const BlueBaseHook = BB.Components.resolve('BlueBaseHook');
		const NavigationProvider = BB.Components.resolve('NavigationProvider');
		const Navigator = BB.Components.resolve('Navigator');

		return (
			<BlueBaseHook hook="bluebase.navigator.root" children={(navigatorConfigs: NavigatorProps) => (
				<NavigationProvider component={() => <Navigator {...navigatorConfigs} />} />
			)} />
		);
	}
}