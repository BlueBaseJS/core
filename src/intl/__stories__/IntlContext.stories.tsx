import { BlueBaseApp } from '@bluebase/core';
import { DirectionPicker } from './DirectionPicker';
import { FormattedMessage } from '../../components';
import { H5 } from '../../getComponent';
import { IntlMessages } from '../IntlContext';
import { LocalePicker } from './LocalePicker';
import React from 'react';
import { View } from 'react-native';
import storiesOf from '@bluebase/storybook-addon';

const filters = {
	'bluebase.intl.messages.ur': (messages: IntlMessages) => ({
		...messages,
		'Hello! 👋': 'ہیلو! 👋',
	}),
};

storiesOf('IntlContext', module)
	.add('Locale', () => (
		<BlueBaseApp filters={filters}>
			<View>
				<LocalePicker />
				<FormattedMessage component={H5}>Hello! 👋</FormattedMessage>
				<FormattedMessage style={{ color: 'blue' }}>How are you?</FormattedMessage>
			</View>
		</BlueBaseApp>
	))

	.add('Direction', () => (
		<BlueBaseApp filters={filters}>
			<View>
				<DirectionPicker />
				<LocalePicker />
				<View style={{ flexDirection: 'row' }}>
					<View style={{ flex: 1, backgroundColor: 'green' }}>
						<FormattedMessage component={H5}>Hello! 👋</FormattedMessage>
					</View>
					<View style={{ flex: 2, backgroundColor: 'yellow' }}>
						<FormattedMessage>How are you?</FormattedMessage>
					</View>
				</View>
			</View>
		</BlueBaseApp>
	));
