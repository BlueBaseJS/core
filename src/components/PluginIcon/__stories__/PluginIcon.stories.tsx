import { BlueBase, BlueBaseConsumer } from '../../..';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('PluginIcon', module)

	.add('Basic Example', () => (
		<BlueBaseConsumer children={(BB: BlueBase) => (
			<BB.Components.PluginIcon />
		)} />
	));