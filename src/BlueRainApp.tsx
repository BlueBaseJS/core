import { BR } from './instance';
import React from 'react';

export interface BlueRainAppProperties {

	// plugins: Plugin[]
}

interface BlueRainAppState {

	booted: boolean;

	Component: React.ComponentType<any>
}

export class BlueRainApp extends React.Component<BlueRainAppProperties, BlueRainAppState> {

	state = {
		booted: BR.booted,

		Component: () => <div>Loading</div>
	};

	async componentDidMount() {
		try {
			const Component = await BR.boot();
			this.setState({
				Component,
				booted: BR.booted,
			});
		} catch (error) {
			// tslint:disable-next-line:no-console
			console.error(error);
		}
	}

	render() {

		const Component = this.state.Component;

		return <Component />;
	}
}