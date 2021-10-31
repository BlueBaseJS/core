import { Picker } from '@react-native-picker/picker';
import React from 'react';

import { useConfig, useIntl } from '../../hooks';

export const LocalePicker = () => {
	const [locale] = useConfig('locale');
	const [localeOptions] = useConfig('locale.options');
	const { changeLocale } = useIntl();

	return (
		<Picker selectedValue={locale} style={{ width: 150 }} onValueChange={changeLocale}>
			{Object.keys(localeOptions).map((l: string) => (
				<Picker.Item label={localeOptions[l]} value={l} key={l} />
			))}
		</Picker>
	);
};
