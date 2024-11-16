import { ActivityIndicatorProps, ComponentStateProps, LoadingStateProps } from '@bluebase/components';
import React from 'react';

import { getComponent } from '../../getComponent';

const ActivityIndicator = getComponent<ActivityIndicatorProps>('ActivityIndicator');
const ComponentState = getComponent<ComponentStateProps>('ComponentState');

/**
 * # ⏳ LoadingState
 *
 * A component that is used to show a loading state. Shows a spinner by
 * default. If 'timedOut' flag is set then it shows a timeout version.
 *
 * ## Usage
 * ```jsx
 * <LoadingState timedOut={false} retry={retryFunction}/>
 * ```
 *
 * TODO: Add a prop to allow custom text for retry button.
 */
export const LoadingState: React.FC<LoadingStateProps> = ({ timedOut, retry }) => {

	const props: ComponentStateProps = {
		image: <ActivityIndicator />,
	};

	if (timedOut) {
		props.description = 'This is taking longer than usual';

		if (retry) {
			props.actionTitle = 'Retry';
			props.actionOnPress = retry;
		}
	}

	return <ComponentState {...props} />;
};

LoadingState.displayName = 'LoadingState';
export default LoadingState;
