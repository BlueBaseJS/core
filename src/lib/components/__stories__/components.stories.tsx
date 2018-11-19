import React from 'react';
import { Text } from '../index';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('BlueBase Components', module)

.add('Text', () => (
	<Text>A simple text</Text>
));
