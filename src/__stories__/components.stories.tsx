import {
	Body1,
	Body2,
	Caption,
	H1,
	H2,
	H3,
	H4,
	H5,
	H6,
	Overline,
	Subtitle1,
	Subtitle2,
	Text,
	View
} from '../getComponent';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

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
));
