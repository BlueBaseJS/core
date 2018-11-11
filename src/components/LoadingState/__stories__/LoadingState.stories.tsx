import { BlueBase, BlueBaseConsumer } from '../../..';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('LoadingState', module)

.add('With default props', () => (
	<BlueBaseConsumer children={(BB: BlueBase) => (
		<BB.Components.LoadingState />
	)} />
))


.add('Timedout', () => (
	<BlueBaseConsumer children={(BB: BlueBase) => (
		<BB.Components.LoadingState timedOut={true} />
	)} />
));