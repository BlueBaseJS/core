import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push, replace, go, goBack, goForward } from 'react-router-redux';

export default (Component) => {
	const ComponentWithRouter = connect()((props) => {
		const { dispatch, ...other } = props;

		const boundActionCreators = bindActionCreators({ push, replace, go, goBack, goForward }, dispatch);
		return (<Component router={boundActionCreators} {...other} />);
	});

	return props => (<ComponentWithRouter {...props} />);
};
