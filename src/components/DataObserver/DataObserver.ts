import { DataObserverProps } from '@bluebase/components';
import isboolean from 'lodash.isboolean';
import isnil from 'lodash.isnil';
import React from 'react';

import { renderChildrenWithProps } from '../../utils';

/**
 * # ⚡️ DataObserver
 *
 * Observes data to check if it is loading, loaded, or empty. The resulting flags
 * are passed on to the children function. These flags may be used to show different UIs,
 * i.e., loading state, empty state, etc.
 *
 * ## Usage
 * ```jsx
 * <DataObserver>
 *  <Text>{data}</Text>
 * </DataObserver>
 * ```
 */
export const DataObserver: React.FC<DataObserverProps> = ({
	data,
	loading = false,
	isEmpty = (props: DataObserverProps) => {
		// If it's null or undefined
		if (isnil(props.data)) {
			return true;
		}
		// If it's an empty array
		if (Array.isArray(props.data) && props.data.length === 0) {
			return true;
		}
		return false;
	},
	isLoading = (props: DataObserverProps) =>
		!isnil(props.loading) && isboolean(props.loading) ? props.loading : false,
	children,
}) => {
	const empty = isEmpty ? isEmpty({ data, loading }) : false;
	const loadingState = isLoading ? isLoading({ data, loading }) : false;

	return renderChildrenWithProps(children, {
		data,
		empty,
		loading: loadingState,
	});
};

DataObserver.displayName = 'DataObserver';
export default DataObserver;
