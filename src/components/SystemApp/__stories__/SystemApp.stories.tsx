import { BlueBase, BlueBaseConsumer } from '../../..';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('SystemApp', module)

	.add('Basic Example', () => (
		<BlueBaseConsumer children={(BB: BlueBase) => (
			<BB.Components.SystemApp />
		)} />
	));