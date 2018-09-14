import Loadable, { LoadingComponentProps } from 'react-loadable';
import React from 'react';

export function getAsyncComponent(componentPromise: Promise<React.ComponentType<any>>) {

	return Loadable({
		loader: () => componentPromise,

		loading(props: LoadingComponentProps) {
			if (props.error) {
				return <div>Error! <button onClick={props.retry}>Retry</button></div>;
			} else if (props.timedOut) {
				return <div>Taking a long time... <button onClick={props.retry}>Retry</button></div>;
			} else if (props.pastDelay) {
				return <div>Loading...</div>;
			} else {
				return null;
			}
		},

		render(Component: React.ComponentType<any>, props: any) {
			return <Component {...props} />;
		}
	});
}