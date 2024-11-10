/* eslint-disable react/jsx-no-bind */
/* eslint-disable max-len */
import { HoverObserverProps } from '@bluebase/components';
import React, { useCallback, useEffect, useState } from 'react';

import { renderChildrenWithProps } from '../../utils';

const Noop = () => {};

/**
 * # 🛸 HoverObserver
 *
 * A React component that notifies its children of hover interactions.
 *
 * Initial code taken from: https://github.com/ethanselzer/react-hover-observer.
 *
 * ## Usage
 * ```jsx
 * <HoverObserver>
 *  {({ isHovering }) => (
 * 		 <YourChildComponent isActive={isHovering} />
 *  )}
 * </HoverObserver>
 * ```
 */
export const HoverObserver: React.FC<HoverObserverProps> = ({
	children,
	hoverDelayInMs = 0,
	hoverOffDelayInMs = 0,
	onHoverChanged = Noop,
	onMouseEnter = ({ setIsHovering }) => setIsHovering(),
	onMouseLeave = ({ unsetIsHovering }) => unsetIsHovering(),
	onMouseOut = Noop,
	onMouseOver = Noop,
}) => {
	const [isHovering, setIsHovering] = useState(false);
	const timerIds: any[] = [];

	const clearTimers = useCallback(() => {
		timerIds.forEach((id) => clearTimeout(id));
		timerIds.length = 0;
	}, [timerIds]);

	const handleSetHovering = useCallback(() => {
		clearTimers();
		const hoverTimerId = setTimeout(() => {
			setIsHovering(true);
			onHoverChanged({ isHovering: true });
		}, hoverDelayInMs);
		timerIds.push(hoverTimerId);
	}, [clearTimers, hoverDelayInMs, onHoverChanged]);

	const handleUnsetHovering = useCallback(() => {
		clearTimers();
		const hoverOffTimerId = setTimeout(() => {
			setIsHovering(false);
			onHoverChanged({ isHovering: false });
		}, hoverOffDelayInMs);
		timerIds.push(hoverOffTimerId);
	}, [clearTimers, hoverOffDelayInMs, onHoverChanged]);

	useEffect(() => clearTimers, [clearTimers]);

	return (
		<div
			onMouseEnter={(e) => onMouseEnter({ e, setIsHovering: handleSetHovering, unsetIsHovering: handleUnsetHovering })}
			onMouseLeave={(e) => onMouseLeave({ e, setIsHovering: handleSetHovering, unsetIsHovering: handleUnsetHovering })}
			onMouseOut={(e) => onMouseOut({ e, setIsHovering: handleSetHovering, unsetIsHovering: handleUnsetHovering })}
			onMouseOver={(e) => onMouseOver({ e, setIsHovering: handleSetHovering, unsetIsHovering: handleUnsetHovering })}
		>
			{renderChildrenWithProps(children, { isHovering })}
		</div>
	);
};

HoverObserver.displayName = 'HoverObserver';
export default HoverObserver;
