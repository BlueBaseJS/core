import { BlueRain, BlueRainApp, BR as _BR } from '@blueeast/bluerain';
import React from 'react';

const BlueRainDecorator = (maybeEsConfigs, BR = _BR) => (storyFn) => {

	const configs = maybeEsConfigs.default ? maybeEsConfigs.default : maybeEsConfigs;

	const Component = () => storyFn();

	const StorybookPlugin = {
		pluginName: 'Storybook Plugin',
		hooks: {
			'bluerain.system.initialized': (ctx: BlueRain) => {
				ctx.Components.replace('SystemLayout', Component);
				return ctx;
			}
		}
	};

	const allConfigs = {
		renderApp: false,
		...configs
	};

	allConfigs.plugins = allConfigs.plugins || [];
	allConfigs.plugins.push(StorybookPlugin);

	// const BluerainApp = BR.boot(allConfigs);
	return <BlueRainApp {...allConfigs} />;
};

export default BlueRainDecorator;
