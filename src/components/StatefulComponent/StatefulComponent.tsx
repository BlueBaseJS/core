import {
	DataObserverChildrenProps,
	DataObserverProps,
	EmptyStateProps,
	ErrorObserverProps,
	LoadingStateProps,
	StatefulComponentProps,
	WaitObserverChildrenProps,
	WaitObserverProps,
} from '@bluebase/components';

import React from 'react';
import { getComponent } from '../../getComponent';

const DataObserver = getComponent<DataObserverProps>('DataObserver');
const EmptyState = getComponent<EmptyStateProps>('EmptyState');
const ErrorObserver = getComponent<ErrorObserverProps>('ErrorObserver');
const LoadingState = getComponent<LoadingStateProps>('LoadingState');
const WaitObserver = getComponent<WaitObserverProps>('WaitObserver');

// tslint:disable: jsdoc-format
/**
 * # 👨‍🎨 StatefulComponent
 *
 * This is a swiss army knife component. Intended to be used as a single source of UI
 * state management. It shows empty, loading, error or data states based on the given props.
 *
 * ## Usage
```jsx
<StatefulComponent data={data} loading={true} delay={200} timeout={10000}>
 <Text>Content</Text>
</StatefulComponent>
```
 */
export const StatefulComponent = (props: StatefulComponentProps) => {
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
	} = props;

	const rest = { data, ...other };

	const LoadingComponent = loadingComponent!;
	const EmptyComponent = emptyComponent!;

	return (
		<ErrorObserver {...{ error, checkError, errorComponent, rest }}>
			<DataObserver {...{ isEmpty, isLoading, loading, data, rest }}>
				{(event: DataObserverChildrenProps) => {
					if (event.loading === true) {
						return React.createElement(
							WaitObserver,
							{
								delay,
								onRetry,
								onTimeout,
								timeout,
							},
							(p: WaitObserverChildrenProps) => <LoadingComponent {...p} />
						);
					}

					if (event.empty) {
						return <EmptyComponent />;
					}

					// Render 'component' prop
					if (Component) {
						return React.createElement(Component, rest);
					}

					// 'children' as a function, 'render prop' pattern
					if (typeof children === 'function') {
						return (children as any)(rest);
					}

					// children
					return children;
				}}
			</DataObserver>
		</ErrorObserver>
	);
};

StatefulComponent.displayName = 'StatefulComponent';

StatefulComponent.defaultProps = {
	emptyComponent: EmptyState,
	loadingComponent: LoadingState,
	timeout: 10000,
};
