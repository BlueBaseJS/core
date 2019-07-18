import { ErrorObserverProps, ErrorObserverState } from '@bluebase/components';

import { BlueBase } from '../../BlueBase';
import { BlueBaseContext } from '../../Context';
import { ErrorState } from '../../getComponent';
import React from 'react';

const MISSING_ERROR = Error('An unknown error occurred.');

/**
 * # 🚨 ErrorObserver
 *
 * Observes any exceptions in child tree hierarchy. When an exception is caught, displays
 * an Error state to gracefully handle it on the frontend.
 *
 * ## Usage
 * ```jsx
 * <ErrorObserver
 *  errorComponent={ErrorState}
 * >
 *  <Text>Rendered if there is no error here</Text>
 * </ErrorObserver>
 * ```
 */
export class ErrorObserver extends React.Component<ErrorObserverProps, ErrorObserverState> {
	static contextType: React.Context<BlueBase> = BlueBaseContext;

	public static defaultProps: Partial<ErrorObserverProps> = {
		checkError: (props, state) => props.error || state.error,
	};

	readonly state = {
		error: undefined,
	};

	static getDerivedStateFromProps = (props: ErrorObserverProps, state: ErrorObserverState) => ({
		error: props.checkError ? props.checkError(props, state) : undefined,
	})

	componentDidCatch(e: Error | null) {
		const error = e || MISSING_ERROR;
		this.setState({ error });
	}

	render() {
		const BB: BlueBase = this.context;

		const { error } = this.state;
		const { children, retry } = this.props;

		if (error) {
			BB.Logger.error(error);
			const Error = this.props.errorComponent || ErrorState;
			return React.createElement(Error, { error, retry });
		}

		// 'children' as a function, 'render prop' pattern
		if (typeof children === 'function') {
			return (children as any)();
		}

		return children;
	}
}
