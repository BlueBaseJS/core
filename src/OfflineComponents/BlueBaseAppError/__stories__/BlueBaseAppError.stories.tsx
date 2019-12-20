import { Button, Dimensions, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';

import { BlueBase } from '../../../BlueBase';
import { BlueBaseApp } from '../../BlueBaseApp/BlueBaseApp';
import { BlueBaseAppError } from '../BlueBaseAppError';
import storiesOf from '@bluebase/storybook-addon';

const Bang = () => {
	throw Error('💥 Bang Bang Boom!');
};

const BadBoy = () => {
	const [showError, setShowError] = useState(false);

	return showError ? <Bang /> : <Button title="Bang" onPress={() => setShowError(true)} />;
};

storiesOf('BlueBaseAppError', module)
	.add('Basic Example', () => (
		<View style={{ ...StyleSheet.absoluteFillObject, height: Dimensions.get('window').height }}>
			<BlueBaseAppError BB={new BlueBase()} bootCount={1} progress={{}} />
		</View>
	))
	.add('Simulate Error', () => (
		<View style={{ ...StyleSheet.absoluteFillObject, height: Dimensions.get('window').height }}>
			<BlueBaseApp>
				<BadBoy />
			</BlueBaseApp>
		</View>
	))
	.add('Simulate Production Error', () => (
		<View style={{ ...StyleSheet.absoluteFillObject, height: Dimensions.get('window').height }}>
			<BlueBaseApp configs={{ development: false }}>
				<BadBoy />
			</BlueBaseApp>
		</View>
	))
	.add('Simulate Production Infinite Error', () => (
		<View style={{ ...StyleSheet.absoluteFillObject, height: Dimensions.get('window').height }}>
			<BlueBaseApp configs={{ development: false }}>
				<Bang />
			</BlueBaseApp>
		</View>
	));
