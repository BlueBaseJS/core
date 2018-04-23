import { BlueRain, BlueRainConsumer } from '../../src';
import React from 'react';
import storiesOf from '@blueeast/bluerain-storybook-addon';

storiesOf('Provider', module)

	.add('BlueRainConsumer', () => (
		<BlueRainConsumer>
		{(BR: BlueRain) => <BR.Components.Text>Hello! I'm consuming BlueRain via Render Prop</BR.Components.Text>}
		</BlueRainConsumer>
	));
