import React from 'react';

export interface WaitProps {

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

	/**
	 * The component to render after delay. Receives following props:
	 *
	 * timedOut (boolean): A flag that tells if a timeout has occured
	 * retry (function): Reset wait
	 */
	component: React.ComponentType<any>,
}

interface State {

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
 * ⏰ **Wait Component**
 *
 * This component is used to do the following:
 *
 * - Wait a certain period of time before rendering a component
 * - Show timeout state, if the component is visible for a certain time period
 *
 * A use case for this can be to show a loading state after waiting a certain period
 * of time for data to load, and if the loading takes too long, show a timeout state.
 */
export class Wait extends React.PureComponent<WaitProps> {

	public static defaultProps: Partial<WaitProps> = {
		delay: 200,
		onRetry: () => { return; },
		onTimeout: () => { return; },
	};

	readonly state: State = {
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
			return React.createElement(this.props.component, {
				// pastDelay: this.state.pastDelay,
				retry: this.retry,
				timedOut: this.state.timedOut,
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
