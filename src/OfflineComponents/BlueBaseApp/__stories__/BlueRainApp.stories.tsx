import storiesOf from '@bluebase/storybook-addon';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

import { BlueBaseApp } from '../BlueBaseApp';

storiesOf('BlueBaseApp', module).add('Main App', () => (
	<View style={{ ...StyleSheet.absoluteFillObject, height: Dimensions.get('window').height }}>
		<BlueBaseApp />
	</View>
));
