import { DataObserverProps } from '@bluebase/components';
import isboolean from 'lodash.isboolean';
import isnil from 'lodash.isnil';
import React from 'react';

import { renderChildrenWithProps } from '../../utils';

/**
 * # ⚡️ DataObserver
 *
 * Observes data to check if it is data is loading, loaded or empty. The resulting flags
 * are passed on to the children function. These flags may be used to show different UIs,
 * i.e. loading state, empty state, etc.
 *
 * ## Usage
 * ```jsx
 * <DataObserver>
 *  <Text>{data}</Text>
 * </DataObserver>
 * ```
 */
export class DataObserver extends React.PureComponent<DataObserverProps> {
	public static defaultProps: Partial<DataObserverProps> = {
		loading: false,

		isEmpty: (props: DataObserverProps) => {
			// If its null or undefined
			if (isnil(props.data)) {
				return true;
			}

			// If its an empty array
			if (Array.isArray(props.data) && props.data.length === 0) {
				return true;
			}

			return false;
		},
		isLoading: (props: DataObserverProps) =>
			!isnil(props.loading) && isboolean(props.loading) ? props.loading : false,
	};

	render() {
		const { children } = this.props;

		return renderChildrenWithProps(children, {
			data: this.props.data,
			empty: this.props.isEmpty ? this.props.isEmpty(this.props) : false,
			loading: this.props.isLoading ? this.props.isLoading(this.props) : false,
		});
	}
}
