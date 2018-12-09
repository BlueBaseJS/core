import Loadable from 'react-loadable';
import React from 'react';
import { ReactLoadableLoading } from '../../components';

export function getAsyncComponent(componentPromise: Promise<React.ComponentType<any>>) {

	return Loadable({
		loader: () => componentPromise,
		loading: ReactLoadableLoading,
	});
}
