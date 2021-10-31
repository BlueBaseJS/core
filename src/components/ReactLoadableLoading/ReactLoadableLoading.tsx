import React from 'react';
import { LoadingComponentProps } from 'react-loadable';

import { ErrorState } from '../ErrorState';
import { LoadingState } from '../LoadingState';

/**
 * Loading component used in react-loadable library
 * @param props
 */
export const ReactLoadableLoading = (props: LoadingComponentProps) => {

	if (props.error) {
		return <ErrorState error={props.error} retry={props.retry} />;
	} else if (props.isLoading && props.pastDelay) {
		return <LoadingState timedOut={props.timedOut} retry={props.retry} />;
	} else {
		return null;
	}
};

ReactLoadableLoading.displayName = 'ReactLoadableLoading';
