import React from 'react';
import BR from '../src';

const defaultConfigs = {
	renderApp: false,
	plugins: []
}

const BlueRainDecorator = (configs) => (storyFn) => {

	const Component = () => storyFn();

	const StorybookPlugin = {
		pluginName: 'Storybook Plugin',
		hooks: {
			'bluerain.system.initialized': (ctx) => {
				ctx.Components.replace('SystemLayout', Component);
			}
		}
	};

	configs = Object.assign(defaultConfigs, configs);
	configs.plugins.push(StorybookPlugin)

	const BluerainApp = BR.boot(configs);
	return <BluerainApp />;
};

export default BlueRainDecorator;
