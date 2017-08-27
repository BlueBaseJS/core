/* @flow */
import React from 'react';
import RX from 'reactxp';
import PropTypes from 'prop-types';

import { withWindowInfo } from '../plugins/WindowInfoPlugin';

class ResponsiveLayout extends RX.Component {

	render() {

		const { window, default: def, xs, xm, md, lg, xl, ...props } = this.props;
		const Component = (this.props[window.size]) ? this.props[window.size] : def;

		return (<Component {...props} />);
	}
}

ResponsiveLayout.propTypes = {
	default: PropTypes.element.isRequired,
	xs: PropTypes.element,
	sm: PropTypes.element,
	md: PropTypes.element,
	lg: PropTypes.element,
	xl: PropTypes.element,
};

export default withWindowInfo(ResponsiveLayout);
