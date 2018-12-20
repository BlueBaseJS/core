import { ErrorState, LoadingState } from '../';
import { LoadingComponentProps } from 'react-loadable';
import React from 'react';

/**
 * Loading component used in react-loadable library
 * @param props
 */
export const ReactLoadableLoading = (props: LoadingComponentProps) => {

	if (props.error) {
		return <ErrorState error={props.error} retry={props.retry} />;
	} else if (props.pastDelay) {
		return <LoadingState timedOut={props.timedOut} retry={props.retry} />;
	} else {
		return null;
	}
};