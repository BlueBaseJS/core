import { BlueBase, BootOptions } from '../../BlueBase';
import React from 'react';
import { Text } from 'react-native';

const MISSING_ERROR = 'An unknown error occured.';

export interface BlueBaseAppProps extends Partial<BootOptions> {
	BB?: BlueBase,
	children?: React.ReactNode,
}

interface BlueBaseAppState {

	/**
	 * Has the app booted yet
	 */
	readonly booted: boolean;

	/**
	 * Are we loading the app
	 */
	readonly loading: boolean,

	/**
	 * Any errors occured while booting the app
	 */
	readonly error: any,

	/**
	 * BlueBase instance used by the app
	 */
	readonly BB: BlueBase,

	/**
	 * App Component to render
	 */
	readonly AppComponent: React.ComponentType<any>
}

/**
 * 🚀 BlueBaseApp
 *
 * The main BlueBase app. This is the top level compoent in BlueBase. Takes care
 * of initialisation, and renders either children, or app with routing.
 */
export class BlueBaseApp extends React.Component<BlueBaseAppProps, BlueBaseAppState> {

	constructor(props: BlueBaseAppProps) {
		super(props);

		this.state = {
			AppComponent: () => null,
			BB: props.BB || new BlueBase(),
			booted: false,
			error: null,
			loading: true,
		};
	}

	async componentDidMount() {

		const BB = this.state.BB;

		try {
			const AppComponent = await BB.boot(this.props);
			this.setState({
				AppComponent: AppComponent || this.state.AppComponent,
				booted: BB.booted,
				loading: false,
			});
		} catch (error) {
			this.setState({
				booted: false,
				error,
				loading: false,
			});
		}
	}

	componentDidCatch(error: Error | null) {
		this.setState({
			error: error || new Error(MISSING_ERROR)
		});
	}

	render() {

		const { loading, error, AppComponent, BB } = this.state;

		if (loading) {
			return (<Text>Loading</Text>);
		}

		if (error) {
			const development = BB.Configs.getValue('development');
			const message = (development === true) ? error.message : MISSING_ERROR;

			return (<Text>{message}</Text>);
		}

		return <AppComponent children={this.props.children} />;
	}
}