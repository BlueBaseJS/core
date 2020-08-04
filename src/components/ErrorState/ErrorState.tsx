import { ComponentStateProps, ErrorStateProps } from '@bluebase/components';
import { useBlueBase, useComponent } from '../../hooks';

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
export const ErrorState = (props: ErrorStateProps) => {
	const { error, retry } = props;

	const BB = useBlueBase();
	const ComponentState = useComponent<ComponentStateProps>('ComponentState');

	const development = BB.Configs.getValue('development');

	const csProps: ComponentStateProps = {
		description:
			development && error
				? error.message
				: 'An unknown error has occurred. Please try again later.',
		title: development && error ? error.name : 'Something broke!',
	};

	if (retry) {
		csProps.actionTitle = 'Retry';
		csProps.actionOnPress = retry;
	}

	return <ComponentState {...csProps} />;
};

ErrorState.displayName = 'ErrorState';
