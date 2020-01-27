import { BlueBaseFilterProps, ErrorStateProps, LoadingStateProps } from '@bluebase/components';
import { useComponent, useFilter } from '../../hooks';

import React from 'react';

/**
 * # 🚇 BlueBaseFilter
 *
 * Since filters in BlueBase are based on promises, it may be tedious to handle loading state,
 * error state, etc. It may also become a repetitive task.
 *
 * To solve this issue, we ship BlueBaseFilter component. Just pass name of filter, initial value,
 * and filter arguments as props. The final filtered value will be passed to the children function.
 * This component will handle loading and error states itself.
 *
 * ## Usage
 * ```jsx
 * <BlueBaseFilter filter="math" value={5} args={{ op: 'add' }} children={(val: number) => {
 * 	return <Text>{val}</Text>;
 * }} />
 * ```
 */
export const BlueBaseFilter: React.FunctionComponent<BlueBaseFilterProps> = ({
	filter,
	value: initialValue,
	args,
	children,
}: BlueBaseFilterProps): any => {
	const ErrorState = useComponent<ErrorStateProps>('ErrorState');
	const LoadingState = useComponent<LoadingStateProps>('LoadingState');

	const { error, loading, value } = useFilter(filter, initialValue, args);

	if (loading) {
		return <LoadingState />;
	}

	if (error) {
		return <ErrorState />;
	}

	return children(value);
};
