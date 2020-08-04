import { NavigationProps } from '@bluebase/components';
import React from 'react';
// tslint:disable: object-literal-sort-keys
import { getComponent } from '../../../getComponent';
import storiesOf from '@bluebase/storybook-addon';

const Navigation = getComponent<NavigationProps>('Navigation');

const navigator = {
	type: 'stack',
	routes: [
		{
			name: 'Home',
			path: '',
			screen: 'HomeScreen',
		},
	],
};

storiesOf('Navigation', module).add('With default props', () => (
	<Navigation navigator={navigator} />
));
