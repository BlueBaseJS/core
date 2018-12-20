import { BlueBase, BlueBaseConsumer } from '../../..';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('PluginIcon', module)

	.add('Basic Example', () => (
		<BlueBaseConsumer children={(BB: BlueBase) => {

			BB.Plugins.set('some', {
				icon: {
					source: { uri: 'https://picsum.photos/200' },
					type: 'image',
				},
				value: {},
			});

			return (
				<BB.Components.PluginIcon slug="some"/>
			);
		}} />
	));