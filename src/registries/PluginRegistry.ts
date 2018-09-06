// import { MaybeEsModule, MaybePromise, getModule } from '../utils';
// import { Plugin } from '../models/Plugin';
// import { Registry } from './Registry';
// import isNil from 'lodash.isnil';
// import kebabCase from 'lodash.kebabcase';


// export class PluginRegistry extends Registry<MaybePromise<Plugin>> {


// 	// set(plugin: MaybeEsModule<Plugin>): void;
// 	set(key: string, plugin: MaybeEsModule<Plugin>): void {
// 	// set(key: string | MaybeEsModule<Plugin>, plugin?: MaybeEsModule<Plugin>) {

// 		if (typeof key !== 'string' && !isNil(key)) {
// 			plugin = key as Plugin;
// 			key = '';
// 		}

// 		if (!plugin) {
// 			throw Error('No plugin provided');
// 		}

// 		// If plugin is an ES Module
// 		plugin = getModule(plugin);

// 		if (!plugin.pluginName) {
// 			throw Error('Plugin name not provided.');
// 		}

// 		const slug = kebabCase(plugin.slug ? plugin.slug : plugin.pluginName);

// 		plugin.slug = slug;

// 		const strKey = key && typeof key === 'string' ? key : slug;


// 	}

// 	public initialize = (slug: string) => {

// 		const plugin = this.get(slug);

// 		if (!plugin) {
// 			throw Error(`Plugin "${slug}" does not exist.`);
// 		}

// 		if (plugin.enable === true) {
// 			this.enablePlugin(plugin);
// 		}

// 	}

// 	private enablePlugin = (plugin: Plugin) => {
// 		this.registerPluginHooks(plugin);
// 		this.registerPluginComponents(plugin);
// 		this.registerPluginRoutes(plugin);
// 	}

// 	private disablePlugin = (plugin: Plugin) => {
// 		// do something
// 	}

// 	private registerPluginHooks = (plugin: Plugin) => {
// 		// do something
// 	}

// 	private registerPluginComponents = (plugin: Plugin) => {
// 		// do something
// 	}

// 	private registerPluginRoutes = (plugin: Plugin) => {
// 		// do something
// 	}
// }