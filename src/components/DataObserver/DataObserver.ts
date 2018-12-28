import { MaybeRenderPropChildren } from '../../utils';
import React from 'react';
import isboolean from 'lodash.isboolean';
import isnil from 'lodash.isnil';

export interface DataObserverChildrenProps {
	/** Initial data that was passed as a prop. */
	data: any;

	/** Loading flag. */
	loading: boolean;

	/** Empty flag. */
	empty: boolean;
}

export interface DataObserverProps {
	/** A function used to check if data is loading. */
	isLoading?: (props: DataObserverProps & { [prop: string]: any }) => boolean;

	/** A function used to check if data is empty. */
	isEmpty?: (props: DataObserverProps & { [prop: string]: any }) => boolean;

	/** Loading flag. */
	loading?: boolean;

	/** Input data. */
	data?: any;

	/**
	 * Children, data is passed in the param object of the render prop function.
	 * This object is typed as `DataObserverChildrenProps`.
	 */
	children?: MaybeRenderPropChildren<DataObserverChildrenProps>;

	/**
	 * Used to locate this view in end-to-end tests.
	 */
	testID?: string;
}

export interface DataObserverState {
	// Check
	readonly isLoading: boolean;
	readonly isEmpty: boolean;
}

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
export class DataObserver extends React.PureComponent<DataObserverProps, DataObserverState> {
	public static defaultProps: Partial<DataObserverProps> = {
		loading: false,

		isEmpty: props => {
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
		isLoading: props => (!isnil(props.loading) && isboolean(props.loading) ? props.loading : false),
	};

	readonly state: DataObserverState = {
		isEmpty: this.props.isEmpty ? this.props.isEmpty(this.props) : false,
		isLoading: this.props.isLoading ? this.props.isLoading(this.props) : false,
	};

	render() {
		const { children } = this.props;

		if (typeof children === 'function') {
			return (children as any)({
				data: this.props.data,
				empty: this.state.isEmpty,
				loading: this.state.isLoading,
			});
		}

		return children;
	}
}
