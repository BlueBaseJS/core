import { BlueRain, BlueRainConsumer } from '../../..';
import React from 'react';
import storiesOf from '@blueeast/bluerain-storybook-addon';

storiesOf('JsonSchema', module)

	.add('With default props', () => (
		<BlueRainConsumer children={(BR: BlueRain) => (
			<BR.Components.JsonSchema schema={{
				component: 'Text',
				text: 'This componenet is generated through JsonSchema Component',
				props: {
					style: {
						color: 'red'
					}
				}
			}} />
		)} />
	));