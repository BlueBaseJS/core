import storiesOf from '@bluebase/storybook-addon';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

import { BlueBase } from '../../../BlueBase';
import { BlueBaseAppLoading } from '../BlueBaseAppLoading';

storiesOf('BlueBaseAppLoading', module)
	.add('Basic Example', () => (
		<View style={{ ...StyleSheet.absoluteFillObject, height: Dimensions.get('window').height }}>
			<BlueBaseAppLoading BB={new BlueBase()} bootCount={1} progress={{}} />
		</View>
	))
	.add('With Progress', () => (
		<View style={{ ...StyleSheet.absoluteFillObject, height: Dimensions.get('window').height }}>
			<BlueBaseAppLoading BB={new BlueBase()} bootCount={1} progress={{ progress: 24 }} />
		</View>
	));
