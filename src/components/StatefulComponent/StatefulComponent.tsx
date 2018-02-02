import { withBlueRain, BlueRainType } from '../../index';
import React from 'react';
import isnil from 'lodash.isnil';
import isboolean from 'lodash.isboolean';

const MISSING_ERROR = 'An unknown error occured.';

export interface StatefulComponentProperties {
	// Components
	component: React.ComponentType<any>;
	loadingComponent?: React.ComponentType<any>;
	emptyComponent?: React.ComponentType<any>;
	errorComponent?: React.ComponentType<any>;

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
	StatefulComponentProperties & { bluerain: BlueRainType },
	StatefulComponentState> {


	static defaultProps: StatefulComponentProperties = {
		component: () => null,

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

			isLoading: isLoadingFunc,
			isEmpty: isEmptyFunc,
			checkError,

			bluerain: BR,
			...other
		} = this.props;

		const { isLoading, isEmpty, hasError, error } = this.state;

		const Error = errorComponent || BR.Components.get('ErrorState');
		const Empty = emptyComponent || BR.Components.get('EmptyState');
		const Loading = loadingComponent || BR.Components.get('LoadingState');

		if (hasError) {
			return <Error error={error} />;
		} else if (isLoading) {
			return <Loading />;
		} else if (isEmpty) {
			return <Empty />;
		} else {
			return <Component {...other} />;
		}
	}
}

export default withBlueRain(StatefulComponent);
