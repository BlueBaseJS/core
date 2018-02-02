import { getContext, withContext } from 'recompose';
import BR from './index';
import PropTypes from 'prop-types';
import React from 'react';

const BlueRainProvider = withContext({ bluerain: PropTypes.object }, props => ({
	bluerain: BR
}))(props => React.Children.only(props.children));

const withBlueRain = Component => getContext({ bluerain: PropTypes.object })(Component);

export { BlueRainProvider, withBlueRain };
