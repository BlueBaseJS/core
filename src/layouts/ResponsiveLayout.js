/* @flow */
import React from 'react';
import RX from 'reactxp';
import PropTypes from 'prop-types';

import { withWindowInfo } from '../plugins/WindowInfoPlugin';

class ResponsiveLayout extends RX.Component {

	render() {

		const { window, default: def, xs, xm, md, lg, xl, ...props } = this.props; // eslint-disable-line no-unused-vars
		const Component = (this.props[window.size]) ? this.props[window.size] : def;

		return (<Component {...props} />);
	}
}

ResponsiveLayout.propTypes = {
	default: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
	xs: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
	sm: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
	md: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
	lg: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
	xl: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
};

export default withWindowInfo(ResponsiveLayout);
