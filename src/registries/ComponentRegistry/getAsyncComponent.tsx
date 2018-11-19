import { ErrorState, LoadingState } from '../../lib/components';
import Loadable, { LoadingComponentProps } from 'react-loadable';
import React from 'react';

export function getAsyncComponent(componentPromise: Promise<React.ComponentType<any>>) {

	return Loadable({
		loader: () => componentPromise,
		loading: ReactLoadableLoading,

		// render(Component: React.ComponentType<any>, props: any) {
		// 	return <Component {...props} />;
		// }
	});
}

export const ReactLoadableLoading = (props: LoadingComponentProps) => {

	if (props.error) {
		return <ErrorState error={props.error} retry={props.retry} />;
	} else if (props.pastDelay) {
		return <LoadingState timedOut={props.timedOut} retry={props.retry} />;
	} else {
		return null;
	}
};