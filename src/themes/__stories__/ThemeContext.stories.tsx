// tslint:disable:no-console
import { BlueBase, BlueBaseConsumer } from '../..';
import React from 'react';
import { ThemeDemo } from '../../themes/__stories__/ThemeDemo';
import { ThemePicker } from '../../themes/__stories__/ThemePicker';
import { ThemeProvider } from '..';
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

.add('Basic Example with overrides', () => (
	<BlueBaseConsumer children={(BB: BlueBase) => (
		<ThemeProvider theme="bluebase-dark" overrides={{ palette: { background: { default: 'red' } } }}>
			<BB.Components.View style={{ margin: 8 }}>
				<ThemeDemo />
			</BB.Components.View>
		</ThemeProvider>
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
		<BB.Components.View>
			<BB.Components.ThemedCard>
				A card with defaultStyles
			</BB.Components.ThemedCard>
			<ThemePicker />
		</BB.Components.View>
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
