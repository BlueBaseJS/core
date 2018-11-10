import { BlueBase, BlueBaseConsumer } from '../../..';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('Noop', module)

	.add('With default props', () => (
		<BlueBaseConsumer children={(BB: BlueBase) => (
			<BB.Components.Noop />
		)} />
	));