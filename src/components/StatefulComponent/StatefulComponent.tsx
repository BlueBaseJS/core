import {
	DataObserver,
	EmptyState,
	ErrorObserver,
	LoadingState,
	WaitObserver,
} from '../../getComponent';
import {
	DataObserverChildrenProps,
	StatefulComponentProps,
	WaitObserverChildrenProps,
} from '@bluebase/components';

import React from 'react';

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
export class StatefulComponent extends React.PureComponent<StatefulComponentProps> {
	public static defaultProps: Partial<StatefulComponentProps> = {
		emptyComponent: EmptyState,
		loadingComponent: LoadingState,
		timeout: 10000,
	};

	render() {
		const {
			component: Component,
			loadingComponent: LoadingComponent,
			emptyComponent: EmptyComponent,
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
			<ErrorObserver {...{ error, checkError, errorComponent, rest }}>
				<DataObserver {...{ isEmpty, isLoading, loading, data, rest }}>
					{(event: DataObserverChildrenProps) => {
						if (event.loading === true) {
							return React.createElement(WaitObserver, {
								children: (props: WaitObserverChildrenProps) => <LoadingComponent {...props} />,
								delay,
								onRetry,
								onTimeout,
								timeout,
							});
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
	}
}
