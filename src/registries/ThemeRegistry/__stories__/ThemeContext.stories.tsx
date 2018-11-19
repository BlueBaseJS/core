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
		<BB.Components.View>
			<ThemePicker />
			<ThemeDemo />
		</BB.Components.View>
	)} />
))

.add('Nested Theme', () => (
	<BlueBaseConsumer children={(BB: BlueBase) => (
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
	)} />
))

.add('3 Level Nesting', () => (
	<BlueBaseConsumer children={(BB: BlueBase) => (
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
	)} />
));

storiesOf('Themes', module)

.add('A component with defaultStyles', () => (
	<BlueBaseConsumer children={(BB: BlueBase) => (
		<BB.Components.ThemedCard>
			A card with defaultStyles (Color: Red)
		</BB.Components.ThemedCard>
	)} />
))

.add('A component with styles from theme', () => (
	<BlueBaseConsumer children={(BB: BlueBase) => (
		<BB.Components.ThemedCard2>
			A Card with styles from the theme (Color: Green)
		</BB.Components.ThemedCard2>
	)} />
))

.add('A component with styles from prop', () => (
	<BlueBaseConsumer children={(BB: BlueBase) => (
		<BB.Components.ThemedCard2 styles={{ root: { backgroundColor: 'blue' } }}>
			A Card with styles from the theme (Color: Blue)
		</BB.Components.ThemedCard2>
	)} />
))

.add('A component with styles from component registry', () => (
	<BlueBaseConsumer children={(BB: BlueBase) => (
		<BB.Components.ThemedCard3>
			A Card with styles from component registry (Color: Orange)
		</BB.Components.ThemedCard3>
	)} />
));
