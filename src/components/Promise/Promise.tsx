import { MaybePromise, RenderPropChildren, getDefinitePromise } from '../../utils';
import Loadable from 'react-loadable';
import React from 'react';
import { ReactLoadableLoading } from '..';

export interface PromiseProps {
	variable: MaybePromise<any>,
	children: RenderPropChildren<any>
}

/**
 * Promise
 */
export const Promise = (props: PromiseProps) => {

	const { children, variable } = props;

	const PromiseInternal = Loadable({
		loader: () => getDefinitePromise(variable),
		loading: ReactLoadableLoading,
		render: (result) => {

			if (children && typeof children === 'function') {
				return children(result);
			}

			return null;
		}
	});

	return <PromiseInternal />;
};