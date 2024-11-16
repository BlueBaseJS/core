import { WaitObserverChildrenProps, WaitObserverProps } from '@bluebase/components';
import React, { useEffect, useState } from 'react';

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
export const WaitObserver: React.FC<WaitObserverProps> = ({
	delay = 200,
	timeout,
	onTimeout = () => {},
	onRetry = () => {},
	children,
}) => {
	const [pastDelay, setPastDelay] = useState(false);
	const [timedOut, setTimedOut] = useState(false);

	useEffect(() => {
		let delayTimer: any = null;
		let timeoutTimer: any = null;

		if (delay === 0) {
			setPastDelay(true);
		} else {
			delayTimer = setTimeout(() => setPastDelay(true), delay);
		}

		if (timeout) {
			timeoutTimer = setTimeout(() => {
				onTimeout();
				setTimedOut(true);
			}, timeout);
		}

		return () => {
			if (delayTimer) clearTimeout(delayTimer);
			if (timeoutTimer) clearTimeout(timeoutTimer);
		};
	}, [delay, timeout, onTimeout]);

	const retry = () => {
		onRetry();
		setTimedOut(false);
		setPastDelay(false);
	};

	if (pastDelay) {
		return typeof children === 'function'
			? (children as (props: WaitObserverChildrenProps) => any)({ retry, timedOut })
			: children;
	}

	return null;
};

WaitObserver.displayName = 'WaitObserver';
