import { BlueBase, BlueBaseContext } from '../..';
import { IntlContext, IntlContextData } from '..';
import { Picker } from 'react-native';
import React from 'react';

export class DirectionPicker extends React.PureComponent {

	static contextType = BlueBaseContext;

	render() {
		const BB: BlueBase = (this as any).context;

		return (
			<IntlContext.Consumer children={({ changeDirection }: IntlContextData) => (
				<Picker
					selectedValue={BB.Configs.getValue('direction')}
					style={{ width: 150 }}
					onValueChange={changeDirection}
				>
					<Picker.Item label="Auto" value="auto" />
					<Picker.Item label="Left to Right" value="ltr" />
					<Picker.Item label="Right to Left" value="rtl" />
				</Picker>
			)} />
		);
	}
}
