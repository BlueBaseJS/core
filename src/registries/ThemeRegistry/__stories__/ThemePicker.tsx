// tslint:disable:jsx-alignment jsx-no-lambda no-console
import { BlueBase, BlueBaseConsumer } from '../../../../';
import { Picker } from 'react-native';
import React from 'react';
import { ThemeContext } from '../ThemeContext';

export class ThemePicker extends React.PureComponent {

	render() {

		return (
      <BlueBaseConsumer children={(BB: BlueBase) => (
        <ThemeContext.Consumer children={({ changeTheme }: any) => {

					// if (!BB) {
					// 	return null;
					// }
					return (
						<Picker
							selectedValue={BB.Themes.getSelectedThemeKey()}
							style={{ width: 150 }}
							onValueChange={(itemValue) => changeTheme(itemValue)}>
							<Picker.Item label="BlueBase Light" value="BlueBase.Light" />
							<Picker.Item label="BlueBase Dark" value="BlueBase.Dark" />
						</Picker>
					);
				}} />
      )} />
		);
	}
}