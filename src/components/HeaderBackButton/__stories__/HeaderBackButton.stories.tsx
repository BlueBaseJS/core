// tslint:disable:no-console
import { HeaderBackButton } from '../../../getComponent';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';
import { Button } from 'react-native';


storiesOf('HeaderBackButton', module)

.add('Basic Example', () => (
	<HeaderBackButton />
))

.add('With Title', () => (
	<HeaderBackButton backTitleVisible />
))

.add('With Custom Title', () => (
	<HeaderBackButton backTitleVisible title="Foo" />
))

.add('With Truncated Title', () => (
	<HeaderBackButton
		styles={{}}
		backTitleVisible 
		title="A very very long title sentence" 
		width={100}
	/>
))

.add('With Custom Truncated Title', () => (
	<HeaderBackButton
		styles={{}}
		backTitleVisible 
		title="A very very long title sentence" 
		truncatedTitle="What? lol"
		width={100}
	/>
))

.add('With Tint Color', () => (
	<HeaderBackButton backTitleVisible tintColor="red" />
))

.add('Custom back button image', () => (
	<HeaderBackButton backTitleVisible backImage={<Button title="Foo" onPress={() => {}} />} />
))

.add('Title set to null', () => (
	<HeaderBackButton title={null} backTitleVisible />
));
