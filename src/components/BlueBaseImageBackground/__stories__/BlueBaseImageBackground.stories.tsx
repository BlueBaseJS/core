import { Text, View } from 'react-native';

import { BlueBaseImageBackground } from '../../../getComponent';
import React from 'react';
import { ThemeProvider } from '../../../themes';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('BlueBase Image Background', module)
	.add('Image Background with a uri path', () => (
		<ThemeProvider mode={'dark'}>
			<View>
				<BlueBaseImageBackground source={{ uri: 'https://placeimg.com/200/200/any' }}>
					<Text style={{ color: 'yellow' }}>Welcome to Bluebase Componnents </Text>
					<Text style={{ color: 'yellow' }}>background Image...</Text>
					<Text style={{ color: 'yellow' }}>you can pass a uri prop</Text>
					<Text style={{ color: 'yellow' }}>Inside</Text>
					<Text style={{ color: 'yellow' }}>Inside</Text>
				</BlueBaseImageBackground>
			</View>
		</ThemeProvider>
	))

	.add('BlueBase Image Background with BB assets', () => (
		<View>
			<BlueBaseImageBackground source={'Wallpaper' as any}>
				<Text style={{ color: 'yellow' }}>Welcome to Bluebase Components</Text>
				<Text style={{ color: 'yellow' }}>background Image...</Text>
				{/* <Text style={{color:"yellow"}}>you can pass a uri prop</Text> */}
				{/* <Text style={{color:"yellow"}}>Inside</Text> */}
				{/* <Text style={{color:"yellow"}}>Inside</Text> */}
			</BlueBaseImageBackground>
		</View>
	));
