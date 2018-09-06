import { HookHandlerFn, HookListener } from '../registries';
import { BlueRain } from '../BlueRain';

export type PluginCategory = 'app' | 'store' | 'router' | 'logger' | 'theme' | string;



export interface Plugin {

	/** Name of the plugin */
	pluginName: string,

	slug: string,

	description?: string,

	version?: string,

	enable: boolean,

	categories: PluginCategory | PluginCategory[],

	hooks: { [hookName: string]: HookListener | HookHandlerFn };
	components: any;
	routes: any;

	defaultConfigs: any;


	// Rather than having these event here, why not just run them as hooks?
	initialize: (configs: { [key: string]: any }, BR: BlueRain) => Promise<void> | void;
	onEnable: (BR: BlueRain) => Promise<void> | void;
	onDisable: (BR: BlueRain) => Promise<void> | void;
}