import { BlueBase, BootOptions } from '../../BlueBase';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

import { BlueBaseRoot } from '../../OfflineComponents/BlueBaseRoot/BlueBaseRoot';
import React from 'react';
import { isProduction } from '../../utils';

const MISSING_ERROR = 'An unknown error occured.';

export interface BlueBaseAppProps extends Partial<BootOptions> {
	/** BlueBase Context */
	BB?: BlueBase;

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
	constructor(props: BlueBaseAppProps) {
		super(props);

		this.state = {
			BB: props.BB || new BlueBase(),
			booted: false,
			error: null,
			loading: true,
		};
	}

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
		const { children } = this.props;

		if (loading) {
			return (
				<View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
					<Text>Loading</Text>
				</View>
			);
		}

		if (error) {
			let development = BB.Configs.getValue('development');

			if (development === undefined) {
				development = !isProduction();
			}

			const message = development === true ? error.message : MISSING_ERROR;

			return (
				<ScrollView style={{ flex: 1 }}>
					<SafeAreaView style={{ flex: 1 }}>
						<View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
							<Text style={{ fontWeight: 'bold' }}>🚨 BlueBase Error</Text>
							<Text>{message}</Text>
						</View>
					</SafeAreaView>
				</ScrollView>
			);
		}

		return <BlueBaseRoot BB={BB}>{children}</BlueBaseRoot>;
	}
}
