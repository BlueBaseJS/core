import { BootOptions } from './BlueRain';
import BR from '.';
import React from 'react';

export class BlueRainApp extends React.PureComponent<BootOptions> {

	render() {
		const App = BR.boot(this.props);
		return <App />;
	}
}