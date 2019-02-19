// tslint:disable: object-literal-sort-keys
import { Navigation } from '../../../getComponent';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

const navigator = {
	type: 'stack',
	routes: [{
		name: 'Home',
		path: '',
		screen: 'HomeScreen',
	}]
};

storiesOf('Navigation', module)

	.add('With default props', () => (
		<Navigation navigator={navigator} />
	));
