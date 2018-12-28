import { DataObserver, EmptyState, ErrorObserver, LoadingState, WaitObserver } from '../../getComponent';
import { DataObserverChildrenProps, DataObserverProps } from '../DataObserver';
import { WaitObserverChildrenProps, WaitObserverProps } from '../WaitObserver';
import { ErrorObserverProps } from '../ErrorObserver';
import { MaybeRenderPropChildren } from '../../utils';
import React from 'react';

export interface StatefulComponentProps extends DataObserverProps, ErrorObserverProps, WaitObserverProps {

	// Components
	component?: React.ComponentType<any>;
	loadingComponent?: React.ComponentType<any>;
	emptyComponent?: React.ComponentType<any>;

	children?: MaybeRenderPropChildren;

  /**
   * Used to locate this view in end-to-end tests.
   */
	testID?: string,
}

/**
 * # 👨‍🎨 StatefulComponent
 *
 * This is a swiss army knife component. Intended to be used as a single source of UI
 * state management. It shows empty, loading, error or data states based on the given props.
 *
 * ## Usage
 * ```jsx
 * <StatefulComponent data={data} loading={true} delay={200} timeout={10000}>
 *  <Text>Content</Text>
 * </StatefulComponent>
 * ```
 */
export class StatefulComponent extends React.PureComponent<StatefulComponentProps> {

	public static defaultProps: Partial<StatefulComponentProps> = {
		timeout: 10000,
	};

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
			<ErrorObserver {...{ error, checkError, errorComponent, rest }}>
				<DataObserver
					{...{ isEmpty, isLoading, loading, data, rest }}
					children={(event: DataObserverChildrenProps) => {

						if (event.loading === true) {
							return React.createElement(WaitObserver, {
								children: (props: WaitObserverChildrenProps) => <LoadingState {...props} />,
								delay,
								onRetry,
								onTimeout,
								timeout,
							});
						}

						if (event.empty) {
							return (<EmptyState />);
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
			</ErrorObserver>
		);
	}
}