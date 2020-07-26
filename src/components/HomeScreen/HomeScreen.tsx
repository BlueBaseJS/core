import { ComponentStateProps } from '@bluebase/components';
import React from 'react';
import { getComponent } from '../../getComponent';

const ComponentState = getComponent<ComponentStateProps>('ComponentState');

export interface HomeScreenProps {
	/**
	 * Used to locate this view in end-to-end tests.
	 */
	testID?: string;
}

/**
 * # 🏠 HomeScreen
 *
 * ## Usage
 * ```jsx
 * <HomeScreen/>
 * ```
 */
export const HomeScreen = (props: HomeScreenProps) => (
	<ComponentState
		title="BlueBase"
		description="Welcome to BlueBase Framework!"
		imageSource="LogoSquare"
		styles={{ image: { width: 100, height: 100 } }}
		{...props}
	/>
);

HomeScreen.displayName = 'HomeScreen';
