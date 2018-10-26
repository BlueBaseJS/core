import { BlueBase, BlueBaseConsumer } from '../../..';
import React from 'react';
import storiesOf from '@blueeast/bluerain-storybook-addon';

storiesOf('JsonSchema', module)

	.add('With default props', () => (
		<BlueBaseConsumer children={(BB: BlueBase) => (
			<BB.Components.JsonSchema schema={{
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