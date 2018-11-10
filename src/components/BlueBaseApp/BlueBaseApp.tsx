import { BlueBase, BootOptions } from '../../BlueBase';
import React from 'react';
import { Text } from 'react-native';

export interface BlueBaseAppProperties extends Partial<BootOptions> {
	BB?: BlueBase
}

interface BlueBaseAppState {

	booted: boolean;
	BB: BlueBase

	Component: React.ComponentType<any>
}

export class BlueBaseApp extends React.Component<BlueBaseAppProperties, BlueBaseAppState> {

	constructor(props: BlueBaseAppProperties) {
		super(props);

		this.state = {
			BB: props.BB || new BlueBase(),
			Component: () => <Text>Loading</Text>,
			booted: false,
		};
	}

	async componentDidMount() {

		const BB = this.state.BB;

		try {
			const Component = await BB.boot(this.props);
			this.setState({
				Component,
				booted: BB.booted,
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