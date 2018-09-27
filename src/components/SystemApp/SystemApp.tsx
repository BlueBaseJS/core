import { BlueRain } from '../../BlueRain';
import { BlueRainConsumer } from '../../Context';
import React from 'react';

export class SystemApp extends React.PureComponent {

	render() {

		return (
			<BlueRainConsumer>
				{(BR: BlueRain) => (
					<div {...this.props}>
						<BR.Components.SystemHeader />
						<BR.Components.SystemContent />
						<BR.Components.SystemFooter />
					</div>
				)}
			</BlueRainConsumer>
		);
	}
}