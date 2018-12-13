import { ComponentInputCollection, ConfigsCollection, HookCollectionInput, ThemeItemCollection } from '../registries';
import { BlueBase } from '../BlueBase';
import { DynamicIconProps } from '../components/DynamicIcon';
import { MaybeThunk } from '../utils';
import { PluginInput } from '../registries/PluginRegistry/types';
import kebabCase from 'lodash.kebabcase';

export type PluginCategory = 'app' | 'store' | 'router' | 'logger' | 'theme' | string;

export class Plugin {

	/** Name of the plugin */
	public name!: string;

	/** TODO: Reevaluate requirement of this, after new Registry keys */
	public slug!: string;

	public description?: string;

	public version?: string;

	public categories: PluginCategory | PluginCategory[] = [];

	public hooks: HookCollectionInput = {};

	public components: ComponentInputCollection = {};

	public defaultConfigs: ConfigsCollection = {};

	public themes: ThemeItemCollection = [];

	public icon?: MaybeThunk<DynamicIconProps>;

	/** TODO: Remove from here. Now use PluginRegistry's meta */
	protected enabled: boolean = true;

	// // routes: any;

	constructor(options?: PluginInput) {

		// TODO: write some tests for different scenarios
		Object.assign(this, options || {});

		// this.setup();
	}

	/**
	 * It is mandatory to call this method after creating a new plugin instance.
	 * This is because we want to support values through extended class properties,
	 * but unfortunately, they're not accessible in constructor.
	 *
	 * This is feels dirty, ugly and bad. But we couldn't find a cleaner way around it.
	 *
	 * More info:
	 * - [Github](https://github.com/Microsoft/TypeScript/issues/1617)
	 */
	public setup() {

		if (!this.name) {
			throw Error('Could not create Plugin. Reason: name property is required.');
		}

		this.slug = kebabCase(this.slug ? this.slug : this.name);

		return this;
	}

	public initialize: (configs: { [key: string]: any }, BB: BlueBase) => Promise<void> | void = () => { return; };

	/** TODO: Remove from here. Now use PluginRegistry's meta */
	public isEnabled() {
		return this.enabled;
	}

	/** TODO: Remove from here. Now use PluginRegistry's meta */
	public enable() {
		this.enabled = true;
	}

	/** TODO: Remove from here. Now use PluginRegistry's meta */
	public disable() {
		this.enabled = false;
	}

	/**
	 * Checks if a config key belongs to this plugin. Does so by checking 2 things:
	 *
	 * 1. Does the key start with 'plugin.{slug}.'?
	 * 2. Does the key exist in defaultConfigs property of the plugin?
	 *
	 * Returns true if any of the above are true, otherwise returns false
	 *
	 * @param key
	 */
	public hasConfig(key: string): boolean {
		return key.startsWith(`plugin.${this.slug}.`)
			|| Object.keys(this.defaultConfigs).findIndex(k => k === key) >= 0;
	}
}