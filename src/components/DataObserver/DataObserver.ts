import React from 'react';
import isboolean from 'lodash.isboolean';
import isnil from 'lodash.isnil';
import { MaybeRenderPropChildren } from '../../utils';

export interface DataObserverChildrenProps {
  data: any,
  loading: boolean,
  empty: boolean,
}

export interface DataObserverProps {

  // Checks
	isLoading?: (props: DataObserverProps & { [prop: string]: any }) => boolean;
	isEmpty?: (props: DataObserverProps & { [prop: string]: any }) => boolean;

  // Data Points
  loading?: boolean;
  data?: any;

  children?: MaybeRenderPropChildren<DataObserverChildrenProps>
}

export interface DataObserverState {
  // Check
  readonly isLoading: boolean;
	readonly isEmpty: boolean;
}

/**
 * ⚡️ DataObserver Component
 *
 * Observes data states. Used to check if data is loading, loaded or empty.
 * A use case is to render a different UI for each case.
 */
export class DataObserver extends React.PureComponent<DataObserverProps, DataObserverState> {

  public static defaultProps: Partial<DataObserverProps> = {
		loading: false,

		isLoading: (props) => ((!isnil(props.loading) && isboolean(props.loading)) ? props.loading : false),
		isEmpty: (props) => {
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

  };

  readonly state: DataObserverState = {
		isLoading: (this.props.isLoading) ? this.props.isLoading(this.props) : false,
		isEmpty: (this.props.isEmpty) ? this.props.isEmpty(this.props) : false,
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