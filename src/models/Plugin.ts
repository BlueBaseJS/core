import { BlueBase } from '../BlueBase';
import { ComponentInput } from '../registries/ComponentRegistry/types';
import { DynamicIconProperties } from '../components/DynamicIcon';
import { HookCollectionInput } from '../registries';
import { MaybeThunk } from '../utils';
import { PluginInput } from '../registries/PluginRegistry/types';
import kebabCase from 'lodash.kebabcase';

export type PluginCategory = 'app' | 'store' | 'router' | 'logger' | 'theme' | string;

export class Plugin {

	/** Name of the plugin */
	public name!: string;

	public slug!: string;

	public description?: string;

	public version?: string;

	public categories: PluginCategory | PluginCategory[] = [];

	public hooks: HookCollectionInput = {};

	public components: { [key: string]: ComponentInput } = {};

	public icon?: MaybeThunk<DynamicIconProperties>;

	protected enabled: boolean = true;

	// // routes: any;

	// // defaultConfigs: any;

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