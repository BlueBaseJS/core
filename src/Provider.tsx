import BR, { BlueRain } from './index';
import createReactContext, { Context } from 'create-react-context';
import React from 'react';

const BlueRainContext: Context<BlueRain> = createReactContext(BR);

export const BlueRainConsumer = BlueRainContext.Consumer;
export const BlueRainProvider = ({ value = BR, children }: { value?: BlueRain, children: React.ReactNode }) => (
	<BlueRainContext.Provider value={value} children={children} />
);

export const withBlueRain = (Component: React.ComponentType<any>) => (props: any) => (
	<BlueRainConsumer>
		{(_BR: BlueRain) => (<Component bluerain={_BR} {...props} />)}
	</BlueRainConsumer>
);
