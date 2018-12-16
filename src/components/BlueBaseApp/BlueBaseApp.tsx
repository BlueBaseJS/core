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
				AppComponent,
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

		const { loading, error, AppComponent } = this.state;

		if (loading) {
			return (<Text>Loading</Text>);
		}

		if (error) {
			return (<Text>An error occured</Text>);
		}

		return <AppComponent children={this.props.children} />;
	}
}