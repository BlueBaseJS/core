// import BR from './index';
// export default () => {
// 	BR.Hooks.add('bluerain.system.apps.registered', 'checkHooks', () => {
// 		const systemHooks = [
// 			'bluerain.system.boot.start',
// 			'bluerain.system.configurations.loaded',
// 			'bluerain.system.components.registered',
// 			'bluerain.system.plugins.registered',
// 			'bluerain.system.plugins.initialized',
// 			'bluerain.system.apps.registered',
// 			'bluerain.system.apps.initialized',
// 			'bluerain.system.initialized',
// 			'bluerain.system.app',
// 			'bluerain.system.boot.end',
// 			'bluerain.system.routes',
// 			'bluerain.system.app.schema',
// 			'bluerain.system.app.layout'
// 		];
// 		const hooksData: any[] = [];
// 		// const addedHooks = [];
// 		const runnedHooks: any[] = [];
// 		BR.Plugins.data.forEach(plugin => {
// 			const hooks = plugin.hooks ? Object.keys(plugin.hooks) : [];
// 			const uses = plugin.uses ? plugin.uses.hooks : [];
// 			hooksData.push({ name: plugin.name, hooks, uses });
// 			runnedHooks.push(...uses);
// 		});
// 		BR.Apps.data.forEach(app => {
// 			const hooks = app.hooks ? Object.keys(app.hooks) : [];
// 			const uses = app.uses ? app.uses.hooks : [];
// 			hooksData.push({ name: app.name, hooks, uses });
// 			runnedHooks.push(...uses);
// 		});
// 		runnedHooks.push(...systemHooks);
// 		hooksData.forEach(plugin => {
// 			plugin.hooks.forEach(hook => {
// 				if (!runnedHooks.includes(hook)) {
// 					console.warn(`${plugin.name} is adding ${hook} hook but its not running in the system.`);
// 				}
// 			});
// 		});
// 	});
// };
