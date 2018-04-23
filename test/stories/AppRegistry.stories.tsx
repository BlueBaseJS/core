import { BlueRain, BlueRainConsumer } from '../../src';
import React from 'react';
import storiesOf from '@blueeast/bluerain-storybook-addon';

storiesOf('AppRegistry', module)

	.add('getIconElement (image)', () => (
		<BlueRainConsumer>
			{(BR: BlueRain) => BR.Apps.getIconElement('alarm')}
		</BlueRainConsumer>
	))

	.add('getIconElement (component)', () => (
		<BlueRainConsumer>
			{(BR: BlueRain) => BR.Apps.getIconElement('android', { size: 150 })}
		</BlueRainConsumer>
	))

	.add('getIconElement (thunk)', () => (
		<BlueRainConsumer>
			{(BR: BlueRain) => BR.Apps.getIconElement('apps', { size: 150 })}
		</BlueRainConsumer>
	));
