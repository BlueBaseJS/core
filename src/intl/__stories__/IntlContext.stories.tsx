import { TextProps, View } from 'react-native';

import { BlueBaseApp } from '../../OfflineComponents';
import { DirectionPicker } from './DirectionPicker';
import { FormattedMessage } from '../../components';
import { IntlMessages } from '../../contexts';
import { LocalePicker } from './LocalePicker';
import React from 'react';
import { getComponent } from '../../getComponent';
import storiesOf from '@bluebase/storybook-addon';
import wait from 'waait';

const H5 = getComponent<TextProps>('H5');

const filters = {
	'bluebase.intl.messages.ur': (messages: IntlMessages) => ({
		...messages,
		'Hello! 👋': 'ہیلو! 👋',
	}),
};

const filtersLate = {
	'bluebase.intl.messages.ur': async (messages: IntlMessages) => {
		await wait(2000);
		return {
			...messages,
			'Hello! 👋': 'ہیلو! 👋',
		};
	},
};

storiesOf('IntlContext', module)
	.add('Locale', () => (
		<BlueBaseApp filters={filters}>
			<View style={{ padding: 40 }}>
				<LocalePicker />
				<FormattedMessage component={H5}>Hello! 👋</FormattedMessage>
				<FormattedMessage style={{ color: 'blue' }}>How are you?</FormattedMessage>
			</View>
		</BlueBaseApp>
	))
	.add('Delayed translation', () => (
		<BlueBaseApp filters={filtersLate} configs={{ locale: 'ur' }}>
			<View style={{ padding: 40 }}>
				<LocalePicker />
				<FormattedMessage component={H5}>Hello! 👋</FormattedMessage>
				<FormattedMessage style={{ color: 'blue' }}>How are you?</FormattedMessage>
			</View>
		</BlueBaseApp>
	))

	.add('Direction', () => (
		<BlueBaseApp filters={filters}>
			<View style={{ padding: 40 }}>
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
