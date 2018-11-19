import { DataObserverChildrenProps, DataObserverProps } from '../DataObserver';
import { WaitObserverChildrenProps, WaitObserverProps } from '../WaitObserver';
import { BlueBase } from '../../BlueBase';
import { BlueBaseConsumer } from '../../Context';
import { ErrorObserverProps } from '../ErrorObserver';
import { MaybeRenderPropChildren } from '../../utils';
import React from 'react';

export interface StatefulComponentProps extends DataObserverProps, ErrorObserverProps, WaitObserverProps {

	// Components
	component?: React.ComponentType<any>;
	loadingComponent?: React.ComponentType<any>;
	emptyComponent?: React.ComponentType<any>;

	children?: MaybeRenderPropChildren;
	// children?: ( (...args: any[]) => any) | React.ReactNode;
}

/**
 * 👨‍🎨 StatefulComponent
 */
export class StatefulComponent extends React.PureComponent<StatefulComponentProps> {

	render() {

		const {
			component: Component,
			loadingComponent,
			emptyComponent,
			errorComponent,
			children,

			// DataObserver
			isLoading,
			isEmpty,
			loading,
			data,

			// WaitObserver
			delay,
			timeout,
			onRetry,
			onTimeout,

			// ErrorObserver
			error,
			checkError,

			...other
		} = this.props;

		const rest = { data, ...other };

		return (
			<BlueBaseConsumer children={(BB: BlueBase) => (
				<BB.Components.ErrorObserver {...{ error, checkError, errorComponent, rest }}>
					<BB.Components.DataObserver
						{...{ isEmpty, isLoading, loading, data, rest }}
						children={(event: DataObserverChildrenProps) => {

							if (event.loading) {
								return (
									<BB.Components.WaitObserver
										{...{ delay, timeout, onRetry, onTimeout, rest }}
										children={(props: WaitObserverChildrenProps) => <BB.Components.LoadingState {...props} />}
									/>
								);
							}

							if (event.empty) {
								return (<BB.Components.EmptyState />);
							}

							// Render 'component' prop
							if (Component) { return React.createElement(Component, rest); }

							// 'children' as a function, 'render prop' pattern
							if (typeof children === 'function') {
								return (children as any)(rest);
							}

							// children
							return children;
						}} />
				</BB.Components.ErrorObserver>
			)} />
		);
	}
}