import { TextProps, ViewProps } from 'react-native';

import { BlueBaseApp } from '../OfflineComponents';
import React from 'react';
import { getComponent } from '../getComponent';
import storiesOf from '@bluebase/storybook-addon';

const View = getComponent<ViewProps>('View');
const Text = getComponent<TextProps>('Text');

const H1 = getComponent<TextProps>('H1');
const H2 = getComponent<TextProps>('H2');
const H3 = getComponent<TextProps>('H3');
const H4 = getComponent<TextProps>('H4');
const H5 = getComponent<TextProps>('H5');
const H6 = getComponent<TextProps>('H6');
const Subtitle1 = getComponent<TextProps>('Subtitle1');
const Subtitle2 = getComponent<TextProps>('Subtitle2');
const Body1 = getComponent<TextProps>('Body1');
const Body2 = getComponent<TextProps>('Body2');
const Caption = getComponent<TextProps>('Caption');
const Overline = getComponent<TextProps>('Overline');

const HookButton = getComponent('HookButton');

storiesOf('BlueBase Components', module)
	.add('Typography', () => (
		<View>
			<H1>Heading 1</H1>
			<H2>Heading 2</H2>
			<H3>Heading 3</H3>
			<H4>Heading 4</H4>
			<H5>Heading 5</H5>
			<H6>Heading 6</H6>
			<Subtitle1>Subtitle 1</Subtitle1>
			<Subtitle2>Subtitle 2</Subtitle2>
			<Body1>Body 1</Body1>
			<Body2>Body 2</Body2>
			<Caption>Caption</Caption>
			<Overline>Overline</Overline>
			<Text>Text (should be same as Body 1)</Text>
		</View>
	))
	.add('React Hook Component', () => (
		<BlueBaseApp components={{ HookButton: import('./HookButton') as any }}>
			<HookButton />
		</BlueBaseApp>
	));
