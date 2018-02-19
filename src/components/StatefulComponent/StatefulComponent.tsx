import { BlueRain, withBlueRain } from '../../index';
import React from 'react';
import isboolean from 'lodash.isboolean';
import isnil from 'lodash.isnil';

const MISSING_ERROR = 'An unknown error occured.';

export interface StatefulComponentProperties {
	// Components
	component?: React.ComponentType<any>;
	loadingComponent?: React.ComponentType<any>;
	emptyComponent?: React.ComponentType<any>;
	errorComponent?: React.ComponentType<any>;
	children?: (...args: any[]) => any | React.ReactNode;

	// Checks
	isLoading: (props: StatefulComponentProperties) => boolean;
	isEmpty: (props: StatefulComponentProperties) => boolean;
	checkError: (props: StatefulComponentProperties) => any;

	// Data Points
	loading: boolean;
	data?: any;
	error?: any;
}

export type StatefulComponentState = {

	// Check
	isLoading: boolean;
	isEmpty: boolean;
	hasError: boolean;

	// Data
	error?: any;
};

class StatefulComponent extends React.Component<
	StatefulComponentProperties & { bluerain: BlueRain },
	StatefulComponentState> {

	static defaultProps: StatefulComponentProperties = {

		loading: false,

		isLoading: (props) => ((!isnil(props.loading) && isboolean(props.loading)) ? props.loading : false),
		isEmpty: (props) => (!isnil(props.data)) ? true : false,
		checkError: (props) => (!isnil(props.error)) ? true : false,
	};

	state: StatefulComponentState = {
		isLoading: this.props.isLoading(this.props),
		isEmpty: this.props.isEmpty(this.props),
		hasError: this.props.checkError(this.props) ? true : false,
		error: this.props.checkError(this.props)
	};

	componentWillReceiveProps(props: StatefulComponentProperties) {

		if (!props) {
			return;
		}

		const error = props.checkError(props);
		const hasError = error ? true : false;

		const isLoading = props.isLoading(props);
		const isEmpty = props.isEmpty(props);

		this.setState({
			isLoading,
			isEmpty,
			hasError,
			error,
		});
	}

	componentDidCatch(error: Error | null) {
		this.setState({
			hasError: true,
			error: error || new Error(MISSING_ERROR)
		});
	}

	render() {

		const {
			component: Component,
			loadingComponent,
			emptyComponent,
			errorComponent,
			children,

			isLoading: isLoadingFunc,
			isEmpty: isEmptyFunc,
			checkError,

			bluerain: BR,
			...other
		} = this.props;

		const { isLoading, isEmpty, hasError, error } = this.state;

		const Error = errorComponent || BR.Components.ErrorState;
		const Empty = emptyComponent || BR.Components.EmptyState;
		const Loading = loadingComponent || BR.Components.LoadingState;

		///// Results /////

		// Error State
		if (hasError) { return React.createElement(Error, { error }); }

		// Loading State
		if (isLoading) { return React.createElement(Loading, other); }

		// Empty State
		if (isEmpty) { return React.createElement(Empty, other); }

		// Render 'component' prop
		if (Component) { return React.createElement(Component, other); }

		// 'children' as a function, 'render prop' pattern
		if (typeof children === 'function') {

			// componentDidCatch doesn't catch it's own errors
			try {
				return children(other);
			} catch (error) {
				this.setState({ hasError: true, error });
				return null;
			}
		}

		// children
		return children;
	}
}

export default withBlueRain(StatefulComponent);
