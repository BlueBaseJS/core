import { ActivityIndicator, ComponentState } from '../../getComponent';
import { ComponentStateProps, LoadingStateProps } from '@bluebase/components';

import { BlueBase } from '../../BlueBase';
import { BlueBaseContext } from '../../Context';
import React from 'react';

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
	static contextType: React.Context<BlueBase> = BlueBaseContext;

	render() {
		const { timedOut, retry } = this.props;

		const props: ComponentStateProps = {
			image: <ActivityIndicator />,
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
