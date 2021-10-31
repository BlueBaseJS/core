/* eslint-disable react/display-name */
import { Text } from '@bluebase/components';
import React from 'react';

import { createPlugin } from '../PluginRegistry';

export default createPlugin({
	key: 'app-1',
	name: 'D App 1',

	icon: {
		name: 'delete',
		type: 'icon',
	},

	routes: {
		name: 'App1',
		path: '',
		screen: () => <Text>App1</Text>,
	},
});
