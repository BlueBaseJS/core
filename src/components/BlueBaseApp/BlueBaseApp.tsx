import { BlueBase, BootOptions } from '../../BlueBase';
import {
	BlueBaseAppError,
	BlueBaseAppErrorProps,
	BlueBaseAppLoading,
	BlueBaseAppLoadingProps,
	BlueBaseRoot,
} from '../../OfflineComponents';

import React from 'react';

const MISSING_ERROR = 'An unknown error occured.';

export interface BlueBaseAppProps extends Partial<BootOptions> {
	/** BlueBase Context */
	BB?: BlueBase;

	/** Component rendered when an error occurs */
	ErrorComponent: React.ComponentType<BlueBaseAppErrorProps>;

	/** Component rendered when an error occurs */
	LoadingComponent: React.ComponentType<BlueBaseAppLoadingProps>;

	/**
	 * If this prop is provided, this tree will be rendered instead of BlueBase's own view.
	 */
	children?: React.ReactNode;

	/**
	 * Used to locate this view in end-to-end tests.
	 */
	testID?: string;
}

interface BlueBaseAppState {
	/**
	 * Has the app booted yet
	 */
	readonly booted: boolean;

	/**
	 * Are we loading the app
	 */
	readonly loading: boolean;

	/**
	 * Any errors occured while booting the app
	 */
	readonly error: any;

	/**
	 * BlueBase instance used by the app
	 */
	readonly BB: BlueBase;
}

/**
 * # 🚀 BlueBaseApp
 *
 * The main BlueBase app. This is the top level component in BlueBase. Takes care
 * of initialisation, and renders either children, or app with routing.
 *
 * ## Usage
 * ```jsx
 * <BlueBaseApp BB={BB} plugins={{}} filter={{}} themes={{}} />
 * ```
 */
export class BlueBaseApp extends React.Component<BlueBaseAppProps, BlueBaseAppState> {
	static defaultProps: Partial<BlueBaseAppProps> = {
		ErrorComponent: BlueBaseAppError,
		LoadingComponent: BlueBaseAppLoading,
	};

	readonly state: BlueBaseAppState = {
		BB: this.props.BB || new BlueBase(),
		booted: false,
		error: null,
		loading: true,
	};

	async componentDidMount() {
		const BB = this.state.BB;

		try {
			await BB.boot(this.props);
			this.setState({
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
			error: error || new Error(MISSING_ERROR),
		});
	}

	render() {
		const { loading, error, BB } = this.state;
		const { ErrorComponent, LoadingComponent, children } = this.props;

		if (loading) {
			return <LoadingComponent BB={BB} />;
		}

		if (error) {
			return <ErrorComponent error={error} BB={BB} />;
		}

		return <BlueBaseRoot BB={BB}>{children}</BlueBaseRoot>;
	}
}
