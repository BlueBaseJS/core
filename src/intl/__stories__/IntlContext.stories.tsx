import { BlueBaseApp, FormattedMessage } from '../../components';
import { H5 } from '../../getComponent';
import { IntlMessages } from '../IntlContext';
import { LocalePicker } from './LocalePicker';
import React from 'react';
import { View } from 'react-native';
import storiesOf from '@bluebase/storybook-addon';

const filters = {
	'bluebase.intl.messages.ur': (messages: IntlMessages) => ({
		...messages,
		'Hello! 👋': 'ہیلو! 👋'
	})
};

storiesOf('IntlContext', module)

.add('Basic Example', () => (
	<BlueBaseApp filters={filters}>
		<View>
			<LocalePicker />
			<FormattedMessage component={H5}>Hello! 👋</FormattedMessage>
			<FormattedMessage style={{ color: 'blue' }}>How are you?</FormattedMessage>
		</View>
	</BlueBaseApp>
))
;
