import { BlueBase } from '../../BlueBase';
import { BlueBaseContext } from '../../Context';
import { ErrorState } from '../../getComponent';
import { MaybeRenderPropChildren } from '../../utils';
import React from 'react';

const MISSING_ERROR = 'An unknown error occured.';

export interface ErrorObserverProps {

	/** If an error is passed as a prop, shows an error state. */
	error?: Error,

	/** A function to check error based on props. */
	checkError?: (props: ErrorObserverProps & any) => Error,

	/** Component to show the error state. */
	errorComponent?: React.ComponentType<any>;

	/** Children are rendered when there are no error. */
	children?: MaybeRenderPropChildren;

  /**
   * Used to locate this view in end-to-end tests.
   */
	testID?: string,

	[prop: string]: any;
}

export interface ErrorObserverState {
	readonly error?: Error,
}

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
export class ErrorObserver extends React.PureComponent<ErrorObserverProps, ErrorObserverState> {

	static contextType = BlueBaseContext;

	public static defaultProps: Partial<ErrorObserverProps> = {
		checkError: (props) => props.error,
	};

	readonly state: ErrorObserverState = {
		error: (this.props.checkError) ? this.props.checkError(this.props) : undefined,
	};

	componentDidCatch(error: Error | null) {
		this.setState({
			error: error || new Error(MISSING_ERROR)
		});
	}

	render() {

		const BB: BlueBase = this.context;

		const { error } = this.state;
		const { children } = this.props;

		if (error) {
			BB.Logger.error(error);
			const Error = this.props.errorComponent || ErrorState;
			return React.createElement(Error, { error });
		}

		// 'children' as a function, 'render prop' pattern
		if (typeof children === 'function') {
			return (children as any)();
		}

		return children;
	}
}
