import { ImageBackgroundProps, Text, View } from 'react-native';

import React from 'react';
import { ThemeProvider } from '../../../themes';
import { getComponent } from '../../../getComponent';
import storiesOf from '@bluebase/storybook-addon';

const BlueBaseImageBackground = getComponent<ImageBackgroundProps>('BlueBaseImageBackground');

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
