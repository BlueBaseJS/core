import { BlueBase, BlueBaseConsumer } from '../../..';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('ErrorState', module)

	.add('With default props', () => (
		<BlueBaseConsumer children={(BB: BlueBase) => (
			<BB.Components.ErrorState />
		)} />
	));