import { Dimensions, StyleSheet, View } from 'react-native';

import { BlueBaseApp } from '../BlueBaseApp';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('BlueBaseApp', module).add('Main App', () => (
	<View style={{ ...StyleSheet.absoluteFillObject, height: Dimensions.get('window').height }}>
		<BlueBaseApp />
	</View>
));
