import React from 'react';
import BR, { BlueRainProvider } from '../src';

const BRConfigs = require('../bluerain');
BRConfigs.renderApp = false;

let BluerainApp;

const BlueRainDecorator = (storyFn) => {

	const Component = () => storyFn();

	// if (!BluerainApp) {
		const Plugin = {
			pluginName: 'Storybook Plugin',
			slug: 'storybook',
			hooks: {
				'bluerain.system.initialized': (ctx) => {
					ctx.Components.replace('SystemLayout', Component);
				}
			}
		};

	if (!BR.Plugins.has('storybook')) {
		BR.Plugins.set(Plugin);
	}
		// BRConfigs.plugins.push(Plugin);
		BluerainApp = BR.boot(BRConfigs);
	// } else {
	// 	BluerainApp = BR.boot();
	// }

	return <BluerainApp />;
};

export default BlueRainDecorator;
