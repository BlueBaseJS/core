import { BlueRain, BlueRainConsumer } from '../../..';
import React from 'react';
import storiesOf from '@blueeast/bluerain-storybook-addon';

storiesOf('ErrorState', module)

	.add('With default props', () => (
		<BlueRainConsumer children={(BR: BlueRain) => (
			<BR.Components.ErrorState />
		)} />
	));