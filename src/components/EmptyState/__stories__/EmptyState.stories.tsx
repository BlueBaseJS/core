import { BlueRain, BlueRainConsumer } from '../../..';
import React from 'react';
import storiesOf from '@blueeast/bluerain-storybook-addon';

storiesOf('EmptyState', module)

	.add('With default props', () => (
		<BlueRainConsumer children={(BR: BlueRain) => (
			<BR.Components.EmptyState />
		)} />
	));