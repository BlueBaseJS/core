import { BlueBase } from '../../BlueBase';
import { BlueBaseContext } from '../../Context';
import { MaybeRenderPropChildren } from '../../utils';
import React from 'react';

const MISSING_ERROR = 'An unknown error occured.';

export interface ErrorObserverProps {
	error?: Error,
	checkError?: (props: ErrorObserverProps & any) => Error,
	errorComponent?: React.ComponentType<any>;
	children?: MaybeRenderPropChildren;
}

export interface ErrorObserverState {
	readonly error?: Error,
}

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

		// FIXME: remove typecasting, added because current react typings don't seem to support this.context
		const BB: BlueBase = (this as any).context;

		const { error } = this.state;
		const { children } = this.props;

		if (error) {
			BB.Logger.error(error);
			const Error = this.props.errorComponent || BB.Components.ErrorState;
			return React.createElement(Error, { error });
		}

		// 'children' as a function, 'render prop' pattern
		if (typeof children === 'function') {
			return (children as any)();
		}

		return children;
	}
}
