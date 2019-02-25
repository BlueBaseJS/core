// tslint:disable:no-console
import { Header } from '../../..';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';
import { Text } from 'react-native';

const Right = () => { return <Text>Right</Text> };

storiesOf('Header', module)

.add('Basic Example', () => (
	<Header />
))

.add('With title', () => (
	<Header title="Foo" />
))

.add('No back button', () => (
	<Header 
		title="Foo"
		headerLeft={null}
	/>
))

.add('With title & back custom button text', () => (
	<Header 
		title="Foo"
		backTitleVisible
		headerBackTitle="Go Back"
	/>
))

.add('With title & right element', () => (
	<Header 
		title="Foo"
		headerRight={<Right />}
	/>
))

.add('layoutPreset center', () => (
	<Header 
		title="This is going to be a very very long title"
		headerBackTitle="Go Back, this is a very long sentence"
		headerRight={<Right />}
		layoutPreset="center"
		backTitleVisible
	/>
))

.add('Transparent Background', () => (
	<Header 
		title="This is going to be a very very long title"
		headerBackTitle="Go Back"
		headerRight={<Right />}
		backTitleVisible
		headerTransparent
	/>
))

.add('header prop is null', () => (
	<Header 
		header={null}
		title="This is going to be a very very long title"
		headerBackTitle="Go Back"
		headerRight={<Right />}
		backTitleVisible
		headerTransparent
	/>
))

.add('right container style', () => (
	<Header 
		headerRight={<Right />}
		headerRightContainerStyle={{ backgroundColor: 'yellow' }}
	/>
))

.add('left container style', () => (
	<Header 
		backTitleVisible
		headerRight={<Right />}
		headerBackTitle="Go Back"
		headerLeftContainerStyle={{ backgroundColor: 'orange' }}
	/>
))

.add('tint color', () => (
	<Header 
		backTitleVisible
		headerTintColor="yellow"
		headerBackTitle="Go Back"
		title="Foo"
	/>
))

.add('title component', () => (
	<Header 
		headerTitle={<Right />}
	/>
))

.add('headerTitle as a string', () => (
	<Header 
		headerTitle="Bar"
		title="Foo"
	/>
))
;
