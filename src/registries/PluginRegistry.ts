import {
	BlueBaseModuleRegistry,
	BlueBaseModuleRegistryInputItem,
	BlueBaseModuleRegistryItem,
} from './BlueBaseModuleRegistry';
import { MaybeThunk, getDefiniteBlueBaseModule, isBlueBaseModule } from '../utils';
import { ComponentCollection } from './ComponentRegistry';
import { ConfigCollection } from './ConfigRegistry';
import { DynamicIconProps } from '../components/';
import { HookNestedCollection } from './HookRegistry';
import { ItemCollection } from './Registry';
import { ThemeCollection } from './ThemeRegistry';

export type PluginCategory =
	| 'app'
	| 'store'
	| 'router'
	| 'logging'
	| 'theme'
	| 'analytics'
	| string;

export interface PluginValue {
	components: ComponentCollection;
	defaultConfigs: ConfigCollection;
	hooks: HookNestedCollection; // HookCollectionInput;
	themes: ThemeCollection;
}

export type PluginValueInput = Partial<PluginValue>;

export interface PluginRegistryItemExtras {
	/**
	 * Name of the plugin.
	 *
	 * We put it in meta so we can show the name in menu een without downloading
	 * the whole plugin.
	 */
	name: string;

	/** Plugin categories */
	categories?: PluginCategory[];

	/** Plugin description */
	description?: string;

	/** Plugin version */
	version?: string;

	/** Plugin Icon Props */
	icon?: MaybeThunk<DynamicIconProps>;

	/** Is this plugin currently enabled/ */
	enabled: boolean;

	[key: string]: any;
}

export type PluginRegistryItem = BlueBaseModuleRegistryItem<PluginValue> & PluginRegistryItemExtras;
export type PluginRegistryInputItem = BlueBaseModuleRegistryInputItem<PluginValueInput>;

type ItemType = PluginRegistryItem;
type ItemInputType = PluginRegistryInputItem;

export type Plugin = PluginRegistryItemExtras & PluginValue;
export type PluginInput = PluginRegistryInputItem;

export type PluginCollection = ItemCollection<PluginInput>;

export function inputToPlugin(plugin: PluginInput): Plugin {
	const { value, ...rest } = plugin;

	return {
		components: {},
		defaultConfigs: {},
		enabled: true,
		hooks: {},
		name: 'Untitled Plugin',
		themes: {},

		...rest,
		...value,
	};
}

/**
 * Creates a BlueBase plugin from input params
 * @param plugin
 */
export function createPlugin(plugin: Plugin): PluginInput {
	const { components, defaultConfigs, hooks, themes, value, ...rest } = plugin;

	return {
		enabled: true,
		name: 'Untitled Plugin',

		...rest,

		value: {
			components,
			defaultConfigs,
			hooks,
			themes,

			...value,
		},
	};
}

/**
 * 🔌 PluginRegistry
 */
export class PluginRegistry extends BlueBaseModuleRegistry<ItemType, ItemInputType> {
	/**
	 * Returns a Promise that resolves a Plugin
	 * @param keys
	 */
	public async resolve(...keys: string[]): Promise<Plugin> {
		const item = this.findOne(...keys);

		if (!item) {
			throw Error(`Could not resolve any of the following plugins: [${keys.join(', ')}].`);
		}

		const input: PluginInput = { ...item, value: await item.value };

		return inputToPlugin(input);
	}

	/**
	 * Checks if a plugin is enabled
	 * @param key
	 */
	public isEnabled(key: string) {
		const item = this.get(key);

		if (!item) {
			throw Error(
				`Could not check if plugin is enabled. Reason: No plugin registered by key "${key}".`
			);
		}

		return item.enabled;
	}

	/**
	 * Enable a plugin
	 * @param key
	 */
	public async enable(key: string) {
		const item = this.get(key);

		if (!item) {
			throw Error(`Could not enable plugin. Reason: No plugin registered by key "${key}".`);
		}

		item.enabled = true;
		this.set(key, item);
	}

	/**
	 * Disable a plugin
	 * @param key
	 */
	public async disable(key: string) {
		const item = this.get(key);

		if (!item) {
			throw Error(`Could not disbale plugin. Reason: No plugin registered by key "${key}".`);
		}

		item.enabled = false;
		this.set(key, item);
	}

	/**
	 * Checks if a config belongs to a plugin. Does so by checking 2 things:
	 *
	 * 1. Does the config start with 'plugin.{key}.'?
	 * 2. Does the config exist in defaultConfigs property of the plugin?
	 *
	 * Returns true if any of the above are true, otherwise returns false
	 *
	 * @param key
	 */
	public hasConfig(key: string, config: string): boolean {
		const plugin = this.get(key);

		if (!plugin) {
			throw Error(
				`Could not check config for a plugin. Reason: No plugin registered by key "${key}".`
			);
		}

		return (
			config.startsWith(`plugin.${key}.`) ||
			Object.keys(plugin.defaultConfigs).findIndex(k => k === config) >= 0
		);
	}

	/**
	 * Convert any input value to an item. This is where you transform inputs and add defualts
	 * @param key
	 * @param partial
	 */
	protected createItem(key: string, partial: any): ItemType {
		return super.createItem(key, {
			categories: [],
			enabled: true,
			name: 'Untitled Plugin',
			...partial,

			value: getDefiniteBlueBaseModule(partial.value),
		});
	}

	/**
	 * Typeguard to check a given object is an input value
	 * @param value
	 */
	protected isInputValue(value: any): value is PluginRegistryInputItem['value'] {
		return isBlueBaseModule(value) || typeof value === 'object';
	}
}
