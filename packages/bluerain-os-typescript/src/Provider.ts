import React from 'react';
import PropTypes from 'prop-types';
import { getContext, withContext } from 'recompose';
import BR from './index';

const BlueRainProvider = withContext({ bluerain: PropTypes.object }, props => ({
	bluerain: BR
}))(props => React.Children.only(props.children));

const withBlueRain = Component =>
	getContext({ bluerain: PropTypes.object })(Component);

export { BlueRainProvider, withBlueRain };
