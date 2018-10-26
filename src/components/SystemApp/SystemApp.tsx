import { BlueBase } from '../../BlueBase';
import { BlueBaseConsumer } from '../../Context';
import React from 'react';

export class SystemApp extends React.PureComponent {

	render() {

		return (
			<BlueBaseConsumer>
				{(BB: BlueBase) => (
					<BB.Components.View {...this.props}>
						<BB.Components.SystemHeader />
						<BB.Components.SystemContent />
						<BB.Components.SystemFooter />
					</BB.Components.View>
				)}
			</BlueBaseConsumer>
		);
	}
}