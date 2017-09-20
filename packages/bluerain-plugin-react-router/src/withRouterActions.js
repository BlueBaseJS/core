import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push, replace, go, goBack, goForward } from 'react-router-redux';

/**
 * withRouterActions higher order component that passes router action functions inside `router` prop.
 * The functions include: push, replace, go, goBack, goForward
 * @param {Component} Component
 */
function withRouterActions(Component) {
	const ComponentWithRouter = connect()((props) => {
		const { dispatch, ...other } = props;

		const boundActionCreators = bindActionCreators({ push, replace, go, goBack, goForward }, dispatch);
		return (<Component router={boundActionCreators} {...other} />);
	});

	return props => (<ComponentWithRouter {...props} />);
}

export default withRouterActions;
