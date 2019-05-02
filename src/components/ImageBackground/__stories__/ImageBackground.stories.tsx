import React from 'react';
import { View, Text } from 'react-native';
import { getComponent } from '../../../getComponent';
import storiesOf from '@bluebase/storybook-addon';

const ImageBackground = getComponent('ImageBackground');


storiesOf('Image Bakground', module)

// .add('Image Background wiht a uri path', () => (
// 	<View >
// 		<ImageBackground source={{uri: 'https://facebook.github.io/react/logo-og.png'}} style={{width: "100%", height: "100%"}}>
			
// 			<Text style={{color:"yellow"}}>Welcome to Bluebase Componnents </Text>
// 			<Text style={{color:"yellow"}}>background Image...</Text>
// 			<Text style={{color:"yellow"}}>you can pass a uri prop</Text>
// 			<Text style={{color:"yellow"}}>Inside</Text>
// 			<Text style={{color:"yellow"}}>Inside</Text>
// 		</ImageBackground>
		
// 	</View>
// ))

.add('Image Background wiht BB assets', () => (
	<View >
		<ImageBackground source="Wallpaper" style={{width: "100%", height: "100%"}}>
			
			<Text style={{color:"yellow"}}>Welcome to Bluebase Componnents </Text>
			<Text style={{color:"yellow"}}>background Image...</Text>
			<Text style={{color:"yellow"}}>you can pass a uri prop</Text>
			<Text style={{color:"yellow"}}>Inside</Text>
			<Text style={{color:"yellow"}}>Inside</Text>
		</ImageBackground>
		
	</View>
));