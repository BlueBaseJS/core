import { WaitObserverProps } from '@bluebase/components';
import { useEffect, useState } from 'react';

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
export const WaitObserver = (props: WaitObserverProps) => {
	const [pastDelay, setPastDelay] = useState(false);
	const [timedOut, setTimedOut] = useState(false);

	let _delay: any;
	let _timeout: any;

	function init() {
		if (typeof props.delay === 'number') {
			if (props.delay === 0) {
				setPastDelay(true);
			} else {
				_delay = setTimeout(() => {
					setPastDelay(true);
				}, props.delay);
			}
		}

		if (typeof props.timeout === 'number') {
			_timeout = setTimeout(() => {
				if (props.onTimeout) {
					props.onTimeout();
				}
				setTimedOut(true);
			}, props.timeout);
		}
	}

	function clearTimeouts() {
		if (_delay) {
			clearTimeout(_delay);
		}
		if (_timeout) {
			clearTimeout(_timeout);
		}
	}

	function retry() {
		if (props.onRetry) {
			props.onRetry();
		}
		setTimedOut(false);
		init();
	}

	useEffect(() => {
		init();

		return clearTimeouts;
	});

	if (pastDelay) {
		const { children } = props;

		if (typeof children === 'function') {
			return children({
				retry,
				timedOut,
			});
		}

		return children;
	}

	return null;
};

const defaultProps: Partial<WaitObserverProps> = {
	delay: 200,
	onRetry: () => {
		return;
	},
	onTimeout: () => {
		return;
	},
};

WaitObserver.defaultProps = defaultProps;
WaitObserver.displayName = 'WaitObserver';
