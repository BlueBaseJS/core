import { BlueBase, BootOptions } from '../../BlueBase';
import React from 'react';
import { Text } from 'react-native';

export interface BlueBaseAppProps extends Partial<BootOptions> {
	BB?: BlueBase,
	children?: React.ReactNode,
}

interface BlueBaseAppState {

	booted: boolean;
	BB: BlueBase

	Component: React.ComponentType<any>
}

/**
 * 🚀 BlueBaseApp
 *
 * This is the Main App used to render at the top level.
 *
 * TODO: Add better docs
 */
// NOTE FOR DEVELOPERS:
// Don't use BlueBase context or any data saved in context (e.g. components)
// here. This is because the context may not be initialized yet.
export class BlueBaseApp extends React.Component<BlueBaseAppProps, BlueBaseAppState> {

	constructor(props: BlueBaseAppProps) {
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

		return <Component children={this.props.children} />;
	}
}