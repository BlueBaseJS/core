import { BlueBase, BlueBaseConsumer } from '../../..';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('LoadingState', module)

	.add('With default props', () => (
		<BlueBaseConsumer children={(BB: BlueBase) => (
			<BB.Components.LoadingState />
		)} />
	))

	.add('With timedOut', () => (
		<BlueBaseConsumer children={(BB: BlueBase) => (
			<BB.Components.LoadingState timedOut={true} />
		)} />
	))

	.add('With timedOut and retry', () => (
		<BlueBaseConsumer children={(BB: BlueBase) => (
			<BB.Components.LoadingState timedOut={true} retry={() => console.log('Hello')}/>
		)} />
	));
