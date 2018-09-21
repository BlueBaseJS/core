import { BlueRain } from '../../BlueRain';
import kebabCase from 'lodash.kebabcase';
import { HookCollection } from '../HookRegistry';

export type PluginCategory = 'app' | 'store' | 'router' | 'logger' | 'theme' | string;

export interface Plugin extends Partial<PluginInternal> {

	/** Name of the plugin */
	pluginName: string,

}

export interface PluginInternal {

	/** Name of the plugin */
	pluginName: string,
	slug: string,

	description?: string,
	version?: string,
	categories?: PluginCategory | PluginCategory[],

	enabled: boolean,

	hooks: HookCollection | ((BR: BlueRain) => HookCollection);
	// components: any;
	// routes: any;

	// defaultConfigs: any;

	// Rather than having these event here, why not just run them as hooks?
	initialize: (configs: { [key: string]: any }, BR: BlueRain) => Promise<void> | void;
	onEnable: (BR: BlueRain) => Promise<void> | void;
	onDisable: (BR: BlueRain) => Promise<void> | void;
}


export function createPlugin(plugin: Plugin): PluginInternal {

	if (!plugin.pluginName) {
		throw Error('"pluginName" property is required in a Plugin object.');
	}

	const slug = kebabCase(plugin.slug ? plugin.slug : plugin.pluginName);

	const emptyFn = () => { return; };

	return {

		enabled: true,
		hooks: {},

		initialize: emptyFn,
		onDisable: emptyFn,
		onEnable: emptyFn,

		...plugin,

		slug,
	};
}