// import { BlueRain, BlueRainConsumer } from '@blueeast/bluerain';
import React from 'react';
import storiesOf from '@blueeast/bluerain-storybook-addon';

import { BlueRainApp } from '../BlueRainApp';

storiesOf('BlueRainApp', module)
	.add('Main App', () => (
		<BlueRainApp />
	));