import { BlueBase } from '../../BlueBase';
import { BlueBaseContext } from '../../Context';
import { ComponentState } from '../../index';
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

	static contextType = BlueBaseContext;

	render() {

		const { error, retry } = this.props;

		const BB: BlueBase = this.context;

		const development = BB.Configs.getValue('development');

		const props: ComponentStateProps = {
			description: (development && error)? error.message : 'An unknown error has occured. Please try again later.',
			title: (development && error) ? error.name : 'Something broke!',
		};

		if (retry) {
			props.actionTitle = 'Retry';
			props.actionOnPress = retry;
		}

		return (<ComponentState {...props} />);
	}
}