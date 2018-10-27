// import { BlueBase, BlueBaseApp, BB as _BB } from '@blueeast/bluebase';
// import React from 'react';

// const BlueBaseDecorator = (maybeEsConfigs, BB = _BB) => (storyFn) => {

// 	const configs = maybeEsConfigs.default ? maybeEsConfigs.default : maybeEsConfigs;

// 	const Component = () => storyFn();

// 	const StorybookPlugin = {
// 		name: 'Storybook Plugin',
// 		hooks: {
// 			'bluebase.boot.end': (bootOpts: any, _args: any, ctx: BlueBase) => {
// 				ctx.Components.replace('SystemApp', Component);
// 				return bootOpts;
// 			}
// 		}
// 	};

// 	const allConfigs = {
// 		renderApp: false,
// 		...configs
// 	};

// 	allConfigs.plugins = allConfigs.plugins || [];
// 	allConfigs.plugins.push(StorybookPlugin);

// 	// const BluerainApp = BB.boot(allConfigs);
// 	return <BlueBaseApp {...allConfigs} />;
// };

// export default BlueBaseDecorator;
