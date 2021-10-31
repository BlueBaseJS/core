import { PluginIconProps } from '@bluebase/components';
import storiesOf from '@bluebase/storybook-addon';
import React from 'react';

import { BlueBase, BlueBaseConsumer } from '../../..';
import { getComponent } from '../../../getComponent';

const PluginIcon = getComponent<PluginIconProps>('PluginIcon');

storiesOf('PluginIcon', module).add('Basic Example', () => (
	<BlueBaseConsumer>
		{(BB: BlueBase) => {
			BB.Plugins.set('some', {
				icon: {
					source: { uri: 'https://picsum.photos/200' },
					type: 'image',
				},
				value: {},
			});

			return <PluginIcon id="some" />;
		}}
	</BlueBaseConsumer>
));
