import { Text, View } from 'react-native';
import { ImageBackground } from '../../../getComponent';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';


// const ImageBackground = getComponent('ImageBackground');


storiesOf('Image Bakground', module)

.add('Image Background wiht a uri path', () => (
	<View >
		<ImageBackground source={{ uri: 'https://placeimg.com/200/200/any' }}>
			<Text style={{ color:'yellow' }}>Welcome to Bluebase Componnents </Text>
			<Text style={{ color:'yellow' }}>background Image...</Text>
			<Text style={{ color:'yellow' }}>you can pass a uri prop</Text>
			<Text style={{ color:'yellow' }}>Inside</Text>
			<Text style={{ color:'yellow' }}>Inside</Text>
		</ImageBackground>
	</View>
))

.add('Image Background wiht BB assets', () => (
	<View >
		<ImageBackground source={'Wallpaper' as any}>
			<Text style={{ color:'yellow' }}>Welcome to Bluebase Componnents </Text>
			<Text style={{ color:'yellow' }}>background Image...</Text>
			{/* <Text style={{color:"yellow"}}>you can pass a uri prop</Text> */}
			{/* <Text style={{color:"yellow"}}>Inside</Text> */}
			{/* <Text style={{color:"yellow"}}>Inside</Text> */}
		</ImageBackground>
	</View>
));