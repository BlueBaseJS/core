import { BlueBase, BlueBaseConsumer } from '../../..';
import React from 'react';
import storiesOf from '@blueeast/bluerain-storybook-addon';

storiesOf('LoadingState', module)

	.add('With default props', () => (
		<BlueBaseConsumer children={(BB: BlueBase) => (
			<BB.Components.LoadingState />
		)} />
	));