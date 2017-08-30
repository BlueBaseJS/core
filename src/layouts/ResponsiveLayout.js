/* @flow */
import React from 'react';
import RX from 'reactxp';
import PropTypes from 'prop-types';

import BR from '../index';

import { withWindowInfo } from '../plugins/WindowInfoPlugin';

class ResponsiveLayout extends RX.Component {

	render() {

		const { window, default: def, xs, xm, md, lg, xl, ...props } = this.props; // eslint-disable-line no-unused-vars
		let Component = (this.props[window.size]) ? this.props[window.size] : def;

		if (typeof Component === 'string') {
			Component = BR.Components.get(Component);
		}

		if (!Component) {
			throw new Error('Invalid Component.');
		}

		return (<Component {...props} />);
	}
}

ResponsiveLayout.propTypes = {
	default: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.string]).isRequired,
	xs: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.string]),
	sm: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.string]),
	md: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.string]),
	lg: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.string]),
	xl: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.string]),
};

export default withWindowInfo(ResponsiveLayout);
