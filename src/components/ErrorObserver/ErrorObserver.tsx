import { ErrorObserverProps, ErrorObserverState, ErrorStateProps } from '@bluebase/components';
import React from 'react';

import { BlueBase } from '../../BlueBase';
import { BlueBaseContext } from '../../contexts';
import { getComponent } from '../../getComponent';

const MISSING_ERROR = Error('An unknown error occurred.');
const ErrorState = getComponent<ErrorStateProps>('ErrorState');

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
		checkError: (props: ErrorObserverProps, state: ErrorObserverState): Error =>
			props.error || (state.error as Error),
	};

	readonly state: ErrorObserverState = {
		error: undefined,
	};

	static getDerivedStateFromProps: any = (
		props: ErrorObserverProps,
		state: ErrorObserverState
	): ErrorObserverState => ({
		error: props.checkError ? props.checkError(props, state) : undefined,
	});

	componentDidCatch(e: Error | null) {
		const error = e || MISSING_ERROR;
		if (this.props.onError) {
			this.props.onError(error);
		}
		this.setState({ error });
	}

	render() {
		const BB: BlueBase = this.context as BlueBase;

		const { error } = this.state;
		const { children, retry, checkError, error: e, errorComponent, ...rest } = this.props;

		if (error) {
			BB.Logger.error(error);

			const Error = this.props.errorComponent || ErrorState;
			return React.createElement(Error, { error, retry, ...rest });
		}

		// 'children' as a function, 'render prop' pattern
		if (typeof children === 'function') {
			return (children as any)();
		}

		return children;
	}
}
