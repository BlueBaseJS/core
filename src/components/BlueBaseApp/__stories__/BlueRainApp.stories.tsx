import { BlueBaseApp } from '../BlueBaseApp';
import React from 'react';
import { View } from 'react-native';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('BlueBaseApp', module).add('Main App', () => (
	<View style={{ height: 800 }}>
		<BlueBaseApp />
	</View>
));
