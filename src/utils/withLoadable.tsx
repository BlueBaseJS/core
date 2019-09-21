import { StatefulComponent, StatefulComponentProps } from '@bluebase/components';

import { Omit } from './';
import React from 'react';
import loadable from '@loadable/component';

export function withLoadable(
	promise: Promise<React.ComponentType<any>>,
	options: Omit<
		StatefulComponentProps,
		'children' | 'component' | 'data' | 'isEmpty' | 'onRetry'
	> = {}
) {
	const Component = loadable(() => promise);
	const {
		checkError,
		delay,
		emptyComponent,
		error,
		errorComponent,
		isLoading,
		loading,
		loadingComponent,
		onTimeout,
		timeout,
	} = options;

	return class InnerLoadable extends React.Component<any> {
		render() {
			const onRetry = this.forceUpdate;

			return (
				<StatefulComponent
					{...{ checkError, error, errorComponent, isEmpty: () => false, onRetry }}
				>
					<Component
						fallback={
							<StatefulComponent
								{...{
									delay,
									emptyComponent,
									isLoading,
									loading,
									loadingComponent,
									onRetry,
									onTimeout,
									timeout,
								}}
							/>
						}
						{...this.props}
					/>
				</StatefulComponent>
			);
		}
	};
}
