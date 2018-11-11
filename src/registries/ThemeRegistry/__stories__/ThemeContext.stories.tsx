// tslint:disable:no-console
import { BlueBase, BlueBaseConsumer } from '../../../';
import React from 'react';
import { ThemeDemo } from './ThemeDemo';
import { ThemePicker } from './ThemePicker';
import { ThemeProvider } from '../index';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('ThemeContext', module)

	.add('basic', () => (
		<BlueBaseConsumer children={(BB: BlueBase) => (
			<ThemeProvider>
				<BB.Components.View>
					<ThemePicker />
					<ThemeDemo />
				</BB.Components.View>
			</ThemeProvider>
		)} />
	));