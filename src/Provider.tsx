import BR, { BlueRain } from './index';
import { getContext, withContext } from 'recompose';
import PropTypes from 'prop-types';
import React from 'react';

export interface ProviderProperties {
	bluerain: BlueRain;
}

const BlueRainProvider = withContext(
    { bluerain: PropTypes.object },
    (props: ProviderProperties) => ({
	bluerain: props.bluerain || BR
})
)(props => React.Children.only(props.children)) as React.ComponentType<any>;

const withBlueRain = (Component: React.ComponentType<any>) =>
    getContext({ bluerain: PropTypes.object })(Component) as React.ComponentType<any>;

//////// Consumer with children as a func (render prop) pattern
const RenderComp = ({
    children,
    bluerain
}: {
	children: (...args: any[]) => React.ReactElement<any>;
	bluerain: BlueRain;
}) => children(bluerain);
const BlueRainConsumer = withBlueRain(RenderComp);

export { BlueRainProvider, withBlueRain, BlueRainConsumer };