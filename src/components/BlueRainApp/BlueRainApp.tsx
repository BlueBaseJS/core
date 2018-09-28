import { BlueRain, BootOptions } from '../../BlueRain';
import React from 'react';

// tslint:disable-next-line:no-var-requires
const { Text } = require('react-native');

export interface BlueRainAppProperties extends Partial<BootOptions> {
	BR?: BlueRain
}

interface BlueRainAppState {

	booted: boolean;
	BR: BlueRain

	Component: React.ComponentType<any>
}

export class BlueRainApp extends React.Component<BlueRainAppProperties, BlueRainAppState> {

	constructor(props: BlueRainAppProperties) {
		super(props);

		this.state = {
			BR: props.BR || new BlueRain(),
			Component: () => <Text>Loading</Text>,
			booted: false,
		};
	}

	async componentDidMount() {

		const BR = this.state.BR;

		try {
			const Component = await BR.boot(this.props);
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