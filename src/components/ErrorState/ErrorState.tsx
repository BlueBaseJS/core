import { BlueBase } from '../../BlueBase';
import { BlueBaseConsumer } from '../../Context';
import { ComponentStateProps } from '../ComponentState';
import React from 'react';

export interface ErrorStateProps {
	error?: Error,
	retry?: () => void,
}

/**
 * 🚨 ErrorState
 */
export class ErrorState extends React.PureComponent<ErrorStateProps> {

	render() {

		const { error, retry } = this.props;

		return (
			<BlueBaseConsumer children={(BB: BlueBase) => {

				const debug = BB.Configs.getValue('debug');

				const props: ComponentStateProps = {
					description: (debug && error)? error.message : 'An unknown error has occured. Please try again later.',
					title: (debug && error) ? error.name : 'Something broke!',
				};

				if (retry) {
					props.actionTitle = 'Retry';
					props.actionOnPress = retry;
				}

				return (<BB.Components.ComponentState {...props} />);
			}} />
		);
	}
}