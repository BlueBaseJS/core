import React from 'react';

export interface WaitObserverChildrenProps {

	/** A flag that tells if a timeout has occured */
	timedOut: boolean,

	/** A function the resets timers */
	retry: () => void
}

export interface WaitObserverProps {

	/** Delay before rendering a component */
	delay?: number,

	/** Timeout duration */
	timeout?: number,

	/**
	 * A callback function executed when a timeout occurs.
	 */
	onTimeout?: () => void;

	/**
	 * A callback function executed when retry method is called from the child component.
	 */
	onRetry?: () => void;

	children: ((props: WaitObserverChildrenProps) => React.ReactNode);
}

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
 * ⏰ **WaitObserver Component**
 *
 * This component is used to do the following:
 *
 * - WaitObserver a certain period of time before rendering a component
 * - Show timeout state, if the component is visible for a certain time period
 *
 * A use case for this can be to show a loading state after waiting a certain period
 * of time for data to load, and if the loading takes too long, show a timeout state.
 */
export class WaitObserver extends React.PureComponent<WaitObserverProps> {

	public static defaultProps: Partial<WaitObserverProps> = {
		delay: 200,
		onTimeout: () => { return; },
		onRetry: () => { return; },
	};

	readonly state: WaitObserverState = {
		pastDelay: false,
    timedOut: false,
	};

	private _delay?: NodeJS.Timer;
	private _timeout?: NodeJS.Timer;

	componentWillMount() {
		this.init();
	}

	componentWillUnmount() {
		this.clearTimeouts();
	}

	render() {
		if (this.state.pastDelay) {
			return this.props.children({
				timedOut: this.state.timedOut,
				retry: this.retry
			});
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
				this.props.onTimeout && this.props.onTimeout();
				this.setState({ timedOut: true });
			}, this.props.timeout);
		}
	}

	private clearTimeouts() {
		this._delay && clearTimeout(this._delay);
		this._timeout && clearTimeout(this._timeout);
	}

	private retry = () => {
		this.props.onRetry && this.props.onRetry();
		this.setState({ timedOut: false });
		this.init();
	}
}
