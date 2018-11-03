// tslint:disable:jsx-alignment jsx-no-lambda no-console
import { BlueBase, BlueBaseConsumer } from '../../../';
import { Picker } from 'react-native';
import React from 'react';
import { Theme } from '../Theme/theme';
import { ThemeContext } from '../ThemeContext';
import { ThemeProvider } from '../index';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('ThemeContext', module)

	.add('basic', () => (
		<BlueBaseConsumer children={(BB: BlueBase) => (
			<ThemeProvider>
				<ThemeContext.Consumer children={({ theme, changeTheme }: { theme: Theme } & any) => {

					const cardStyle = {
						backgroundColor: theme.palette.background.default,
						padding: theme.spacing.unit
					};

					return (
						<BB.Components.View>
							<BB.Components.View style={cardStyle}>
								<BB.Components.Text style={theme.typography.body1}>
									{theme.name}
								</BB.Components.Text>
							</BB.Components.View>

							<Picker
								selectedValue={BB.Themes.getSelectedThemeKey()}
								style={{ width: 150 }}
								onValueChange={(itemValue) => changeTheme(itemValue)}>
								<Picker.Item label="BlueBase Light" value="BlueBase.Light" />
								<Picker.Item label="BlueBase Dark" value="BlueBase.Dark" />
							</Picker>
						</BB.Components.View>
					);
				}} />
			</ThemeProvider>
		)} />
	));