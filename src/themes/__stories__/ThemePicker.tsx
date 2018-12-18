import { BlueBase, BlueBaseContext } from '../../';
import { ThemeContext, ThemeContextData } from '../../themes';
import { Picker } from 'react-native';
import React from 'react';

export class ThemePicker extends React.PureComponent {

	static contextType = BlueBaseContext;

	render() {
		const BB: BlueBase = (this as any).context;
		const themes = [...BB.Themes.entries()];
		return (
			<ThemeContext.Consumer children={({ changeTheme }: ThemeContextData) => (
				<Picker
					selectedValue={BB.Configs.getValue('theme.name')}
					style={{ width: 150 }}
					onValueChange={changeTheme}>
					{themes.map(entry => <Picker.Item label={entry[1].name} value={entry[0]} key={entry[0]} />)}
				</Picker>
			)} />
		);
	}
}
