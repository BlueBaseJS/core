import { useConfig, useIntl } from '../../hooks';

import { Picker } from 'react-native';
import React from 'react';

export const DirectionPicker = () => {
	const { changeDirection } = useIntl();
	const [direction] = useConfig('direction');

	return (
		<Picker selectedValue={direction} style={{ width: 150 }} onValueChange={changeDirection}>
			<Picker.Item label="Auto" value="auto" />
			<Picker.Item label="Left to Right" value="ltr" />
			<Picker.Item label="Right to Left" value="rtl" />
		</Picker>
	);
};

DirectionPicker.displayName = 'DirectionPicker';
