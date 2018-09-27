import { BlueRain } from '../../BlueRain';
import { BlueRainConsumer } from '../../Context';
import React from 'react';

export class SystemApp extends React.PureComponent {

	render() {

		return (
			<BlueRainConsumer>
				{(BR: BlueRain) => (
					<BR.Components.View {...this.props}>
						<BR.Components.SystemHeader />
						<BR.Components.SystemContent />
						<BR.Components.SystemFooter />
					</BR.Components.View>
				)}
			</BlueRainConsumer>
		);
	}
}