// tslint:disable:no-console
import { BlueBase, BlueBaseConsumer } from '../../../';
import React from 'react';
import { ThemeDemo } from './ThemeDemo';
import { ThemePicker } from './ThemePicker';
import { ThemeProvider } from '../index';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('ThemeContext', module)

.add('Basic Example', () => (
	<BlueBaseConsumer children={(BB: BlueBase) => (
		<ThemeProvider>
			<BB.Components.View>
				<ThemePicker />
				<ThemeDemo />
			</BB.Components.View>
		</ThemeProvider>
	)} />
))

.add('Nested Theme', () => (
	<BlueBaseConsumer children={(BB: BlueBase) => (
		<ThemeProvider>
			<BB.Components.View>
				<ThemePicker />
				<ThemeDemo>
					<ThemeProvider theme="bluebase-dark">
						<BB.Components.View style={{ margin: 8 }}>
							<ThemeDemo />
						</BB.Components.View>
					</ThemeProvider>
				</ThemeDemo>
			</BB.Components.View>
		</ThemeProvider>
	)} />
))

.add('3 Level Nesting', () => (
	<BlueBaseConsumer children={(BB: BlueBase) => (
		<ThemeProvider>
			<BB.Components.View>
				<ThemePicker />
				<ThemeDemo>
					<ThemeProvider theme="bluebase-dark">
						<BB.Components.View style={{ margin: 8 }}>
						<ThemeDemo>
							<ThemeProvider>
								<BB.Components.View style={{ margin: 8 }}>
									<ThemePicker />
									<ThemeDemo />
								</BB.Components.View>
							</ThemeProvider>
						</ThemeDemo>
						</BB.Components.View>
					</ThemeProvider>
				</ThemeDemo>
			</BB.Components.View>
		</ThemeProvider>
	)} />
));