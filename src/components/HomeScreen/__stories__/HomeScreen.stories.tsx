import storiesOf from '@bluebase/storybook-addon';
import React from 'react';

import { getComponent } from '../../../getComponent';

const HomeScreen = getComponent('HomeScreen');

storiesOf('HomeScreen', module)

	.add('Basic', () => (
		<HomeScreen />
	));