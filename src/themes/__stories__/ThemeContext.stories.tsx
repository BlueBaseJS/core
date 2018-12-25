// tslint:disable:no-console
import { View, getComponent } from '../../getComponent';
import React from 'react';
import { ThemeDemo } from '../../themes/__stories__/ThemeDemo';
import { ThemePicker } from '../../themes/__stories__/ThemePicker';
import { ThemeProvider } from '..';
import storiesOf from '@bluebase/storybook-addon';

const ThemedCard = getComponent('ThemedCard');
const ThemedCard2 = getComponent('ThemedCard2');
const ThemedCard3 = getComponent('ThemedCard3');

storiesOf('ThemeContext', module)

.add('Basic Example', () => (
	<View>
		<ThemePicker />
		<ThemeDemo />
	</View>
))

.add('Basic Example with overrides', () => (
	<ThemeProvider theme="bluebase-dark" overrides={{ palette: { background: { default: 'red' } } }}>
		<View style={{ margin: 8 }}>
			<ThemeDemo />
		</View>
	</ThemeProvider>
))

.add('Nested Theme', () => (
	<View>
		<ThemePicker />
		<ThemeDemo>
			<ThemeProvider theme="bluebase-dark">
				<View style={{ margin: 8 }}>
					<ThemeDemo />
				</View>
			</ThemeProvider>
		</ThemeDemo>
	</View>
))

.add('3 Level Nesting', () => (
	<View>
		<ThemePicker />
		<ThemeDemo>
			<ThemeProvider theme="bluebase-dark">
				<View style={{ margin: 8 }}>
				<ThemeDemo>
					<ThemeProvider>
						<View style={{ margin: 8 }}>
							<ThemePicker />
							<ThemeDemo />
						</View>
					</ThemeProvider>
				</ThemeDemo>
				</View>
			</ThemeProvider>
		</ThemeDemo>
	</View>
));

storiesOf('Themes', module)

.add('A component with defaultStyles', () => (
	<View>
		<ThemedCard>
			A card with defaultStyles
		</ThemedCard>
		<ThemePicker />
	</View>
))

.add('A component with styles from theme', () => (
	<ThemedCard2>
		A Card with styles from the theme (Color: Green)
	</ThemedCard2>
))

.add('A component with styles from prop', () => (
	<ThemedCard2 styles={{ root: { backgroundColor: 'blue' } }}>
		A Card with styles from the theme (Color: Blue)
	</ThemedCard2>
))

.add('A component with styles from component registry', () => (
	<ThemedCard3>
		A Card with styles from component registry (Color: Orange)
	</ThemedCard3>
));
