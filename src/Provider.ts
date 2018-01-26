import React from 'react';
import { getContext, withContext } from 'recompose';
import BR from './index';

const BlueRainProvider = withContext({}, props => ({
	bluerain: BR
}))(props => React.Children.only(props.children));

const withBlueRain = Component => getContext({})(Component);

export { BlueRainProvider, withBlueRain };
