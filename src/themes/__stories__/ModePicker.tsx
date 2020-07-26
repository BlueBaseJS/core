import { Picker } from 'react-native';
import React from 'react';
import { useTheme } from '../..';

export const ModePicker = () => {
	const { theme, changeMode } = useTheme();

	return (
		<Picker selectedValue={theme.mode} style={{ width: 150 }} onValueChange={changeMode}>
			<Picker.Item label="Light" value="light" />
			<Picker.Item label="Dark" value="dark" />
		</Picker>
	);
};
