import { ActivityIndicator, ComponentState } from '../../index';
import { BlueBaseContext } from '../../Context';
import { ComponentStateProps } from '../ComponentState';
import React from 'react';

export interface LoadingStateProps {

	/** Flag if loading has timedOut. */
	timedOut?: boolean,

	/** Callback function when Retry button is pressed. */
	retry?: () => void,
}

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
export class LoadingState extends React.Component<LoadingStateProps> {

	static contextType = BlueBaseContext;

	render() {

		const { timedOut, retry } = this.props;

		const props: ComponentStateProps = {
			image: <ActivityIndicator />
		};

		if (timedOut === true) {
			props.description = 'This is taking longer than usual';

			if (retry) {
				props.actionTitle = 'Retry';
				props.actionOnPress = retry;
			}
		}

		return <ComponentState {...props} />;
	}
}
