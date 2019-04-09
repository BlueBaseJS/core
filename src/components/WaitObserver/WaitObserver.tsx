import React from 'react';
import { WaitObserverProps } from '@bluebase/components';

interface WaitObserverState {

	/**
	 * Flag that tells if we have waited more time than specified in the delay prop
	 */
	readonly pastDelay: boolean,

	/**
	 * Flag that tells if waiting has timedout
	 */
	readonly timedOut: boolean,
}

/**
 * # ⏰ WaitObserver
 *
 * This component is used to do the following:
 *
 * - WaitObserver a certain period of time before rendering a component
 * - Show timeout state, if the component is visible for a certain time period
 *
 * A use case for this can be to show a loading state after waiting a certain period
 * of time for data to load, and if the loading takes too long, show a timeout state.
 *
 * ## Usage
 * ```jsx
 * <WaitObserver
 *  delay={1000}
 *  timeout={3000}
 *  onTimeout={onTimeout}
 *  onRetry={onRetry}
 *  children={(props: WaitObserverChildrenProps) => <LoadingState {...props} />}
 * />
 * ```
 */
export class WaitObserver extends React.PureComponent<WaitObserverProps, WaitObserverState> {

	public static defaultProps: Partial<WaitObserverProps> = {
		delay: 200,
		onRetry: () => { return; },
		onTimeout: () => { return; },
	};

	readonly state: WaitObserverState = {
		pastDelay: false,
		timedOut: false,
	};

	private _delay?: any;
	private _timeout?: any;

	componentWillMount() {
		this.init();
	}

	componentWillUnmount() {
		this.clearTimeouts();
	}

	render() {
		if (this.state.pastDelay) {

			const { children } = this.props;

			if (typeof children === 'function') {
				return (children as any)({
					retry: this.retry,
					timedOut: this.state.timedOut,
				});
			}

			return children;

		} else {
			return null;
		}
	}

	private init() {
		if (typeof this.props.delay === 'number') {
			if (this.props.delay === 0) {
				this.setState({ pastDelay: true });
			} else {
				this._delay = setTimeout(() => {
					this.setState({ pastDelay: true });
				}, this.props.delay);
			}
		}

		if (typeof this.props.timeout === 'number') {
			this._timeout = setTimeout(() => {
				if (this.props.onTimeout) {
					this.props.onTimeout();
				}
				this.setState({ timedOut: true });
			}, this.props.timeout);
		}
	}

	private clearTimeouts() {
		if (this._delay) {
			clearTimeout(this._delay);
		}
		if (this._timeout) {
			clearTimeout(this._timeout);
		}
	}

	private retry = () => {
		if (this.props.onRetry) {
			this.props.onRetry();
		}
		this.setState({ timedOut: false });
		this.init();
	}
}
