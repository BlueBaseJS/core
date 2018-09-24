import { BlueRain } from '../BlueRain';
import { HookCollectionInput } from '../registries';
import kebabCase from 'lodash.kebabcase';
import { PluginInput } from '../registries/PluginRegistry/types';

export type PluginCategory = 'app' | 'store' | 'router' | 'logger' | 'theme' | string;

export class Plugin {

	/** Name of the plugin */
	readonly name!: string;

	readonly slug!: string;

	readonly description?: string;

	readonly version?: string;

	readonly categories: PluginCategory | PluginCategory[] = [];

	readonly hooks: HookCollectionInput = {};

	protected enabled: boolean = true;

	// // components: any;
	// // routes: any;

	// // defaultConfigs: any;

	constructor(options: PluginInput) {

		Object.assign(this, options);

		if (!this.name) {
			throw Error('Could not create Plugin. Reason: name property is required.');
		}

		this.slug = kebabCase(this.slug ? this.slug : this.name);
	}

	public initialize: (configs: { [key: string]: any }, BR: BlueRain) => Promise<void> | void = () => { return; };

	public isEnabled() {
		return this.enabled;
	}

	public enable() {
		this.enabled = true;
	}

	public disable() {
		this.enabled = false;
	}
}