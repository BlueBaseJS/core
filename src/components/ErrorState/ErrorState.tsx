import { BlueBase } from '../../BlueBase';
import { BlueBaseContext } from '../../Context';
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

		// FIXME: remove typecasting, added because current react typings don't seem to support this.context
		const BB: BlueBase = (this as any).context;

		const development = BB.Configs.getValue('development');

		const props: ComponentStateProps = {
			description: (development && error)? error.message : 'An unknown error has occured. Please try again later.',
			title: (development && error) ? error.name : 'Something broke!',
		};

		if (retry) {
			props.actionTitle = 'Retry';
			props.actionOnPress = retry;
		}

		return (<BB.Components.ComponentState {...props} />);
	}
}