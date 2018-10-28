import React from 'react';

const MISSING_ERROR = 'An unknown error occured.';

export interface ErrorObserverChildrenProps {
  error?: Error,
}

export interface ErrorObserverProps {
  error?: Error,
  checkError?: (props: ErrorObserverProps & any) => Error,
  children: ((props: ErrorObserverChildrenProps) => React.ReactNode);
}

export interface ErrorObserverState {
  readonly error?: Error,
}

export class ErrorObserver extends React.PureComponent<ErrorObserverProps, ErrorObserverState> {

  public static defaultProps: Partial<ErrorObserverProps> = {
		checkError: (props) => props.error,
  };

  readonly state: ErrorObserverState = {
		error: (this.props.checkError) ? this.props.checkError(this.props): undefined,
  };

  componentDidCatch(error: Error | null) {
		this.setState({
			error: error || new Error(MISSING_ERROR)
		});
	}

  render() {
    return this.props.children({ error: this.state.error });
  }
}
