import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from './connect';
import initialState from './InitialState';

export default function withSystemNav(Component) {

	const systemNav = initialState;

	const WithSystemNavComponent =  connect(
		mapStateToProps,
		mapDispatchToProps
	)(Component);

	return props => (<WithSystemNavComponent systemNav={systemNav} {...props} />);
}

