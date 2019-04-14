import { BlueBase, BlueBaseContext } from '../..';
import { IntlContext, IntlContextData } from '..';
import { Picker } from 'react-native';
import React from 'react';

export class LocalePicker extends React.PureComponent {

	static contextType = BlueBaseContext;

	render() {
		const BB: BlueBase = (this as any).context;
		const localeOptions = BB.Configs.getValue('locale.options');

		return (
			<IntlContext.Consumer children={({ changeLocale }: IntlContextData) => (
				<Picker
					selectedValue={BB.Configs.getValue('locale')}
					style={{ width: 150 }}
					onValueChange={changeLocale}>
					{Object.keys(localeOptions).map(locale => (
						<Picker.Item
							label={localeOptions[locale]}
							value={locale}
							key={locale}
						/>
					))}
				</Picker>
			)} />
		);
	}
}
