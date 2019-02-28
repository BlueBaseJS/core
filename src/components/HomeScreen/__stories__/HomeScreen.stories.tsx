import React from 'react';
import { getComponent } from '../../../getComponent';
import storiesOf from '@bluebase/storybook-addon';

const HomeScreen = getComponent('HomeScreen');

storiesOf('HomeScreen', module)

	.add('Basic', () => (
		<HomeScreen />
	));