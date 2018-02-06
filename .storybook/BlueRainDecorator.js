import React from 'react';
import BR, { BlueRainProvider } from '../src';

const BRConfigs = require('../bluerain');
BRConfigs.renderApp = false;

let BluerainApp;

const BlueRainDecorator = (storyFn) => {

	const Component = () => storyFn();

	const Plugin = {
		pluginName: 'Storybook Plugin',
		slug: 'storybook',
		hooks: {
			'bluerain.system.initialized': (ctx) => {
				ctx.Components.replace('SystemLayout', Component);
			}
		}
	};

	BR.Plugins.set(Plugin);
	BluerainApp = BR.boot(BRConfigs);

	return <BluerainApp />;
};

export default BlueRainDecorator;
