import { ComponentStateProps, ErrorStateProps } from '@bluebase/components';

import { BlueBase } from '../../BlueBase';
import { BlueBaseContext } from '../../Context';
import { ComponentState } from '../../getComponent';
import React from 'react';

/**
 * # 🚨 ErrorState
 *
 * Display an error message. Used by UIs when an exception is caught, and an error message
 * needs to be displayed. If in development mode, the actual error is displayed, otherwise
 * displays a generic message in production mode.
 *
 * ## Usage
 * ```jsx
 * <ErrorState retry={retryCallback} error={Error('Bang!')} />
 * ```
 */
export class ErrorState extends React.PureComponent<ErrorStateProps> {
	static contextType = BlueBaseContext;

	render() {
		const { error, retry } = this.props;

		const BB: BlueBase = this.context;

		const development = BB.Configs.getValue('development');

		const props: ComponentStateProps = {
			description:
				development && error
					? error.message
					: 'An unknown error has occurred. Please try again later.',
			title: development && error ? error.name : 'Something broke!',
		};

		if (retry) {
			props.actionTitle = 'Retry';
			props.actionOnPress = retry;
		}

		return <ComponentState {...props} />;
	}
}
