import React from 'react';
import { Text } from '@bluebase/components';
import { createPlugin } from '@bluebase/core';

export default createPlugin({
	key: 'app-2',
	name: 'D App 2',

	icon: {
		name: 'delete',
		type: 'icon',
	},

	routes: {
		name: 'App2',
		path: '',
		screen: () => <Text>App1</Text>,
	},
});
