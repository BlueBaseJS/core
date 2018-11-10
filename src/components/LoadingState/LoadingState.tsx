import { BlueBase } from '../../BlueBase';
import { BlueBaseConsumer } from '../../Context';
import { ComponentStateProps } from '../ComponentState';
import React from 'react';

export interface LoadingStateProps {
	timedOut: boolean,
	retry: () => void,
}

/**
 * ⏳ LoadingState Component
 *
 * A component that is used to show a loading state. Shows a spinner by
 * default. If 'timedOut' flag is set then it shows a timeout version.
 */
export class LoadingState extends React.PureComponent<LoadingStateProps> {

	render() {

		const { timedOut, retry } = this.props;

		return (
			<BlueBaseConsumer children={(BB: BlueBase) => {


				const props: ComponentStateProps = {
					image: <BB.Components.ActivityIndicator />
				};

				if (timedOut === true) {
					props.title = 'This is taking longer than usual';

					if (retry) {
						props.actionTitle = 'Retry';
						props.actionOnPress = retry;
					}
				}

				return <BB.Components.ComponentState {...props} />;
			}} />
		);
	}
}
