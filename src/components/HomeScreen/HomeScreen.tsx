import { ComponentStateProps } from '@bluebase/components';
import React from 'react';

import { getComponent } from '../../getComponent';
import { useConfig } from '../../hooks';

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
export const HomeScreen = (props: HomeScreenProps) => {
	const [title] = useConfig('title');
	const [description] = useConfig('description');

	return (
		<ComponentState
			title={title}
			description={description}
			imageSource={['LogoSquare', 'Logo']}
			styles={{ image: { width: 100, height: 100 } }}
			{...props}
		/>
	);
};

HomeScreen.displayName = 'HomeScreen';
