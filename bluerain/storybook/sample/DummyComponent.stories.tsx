import { BlueRain, BlueRainConsumer } from '@blueeast/bluerain';
import React from 'react';
import storiesOf from '@blueeast/bluerain-storybook-addon';

storiesOf('BlueRain', module)
	.add('DummyComponent', () => (
		<BlueRainConsumer>
			{(BR: BlueRain) => <BR.Components.DummyComponent />}
		</BlueRainConsumer>
	));