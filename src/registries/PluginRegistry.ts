import {
	BlueBaseModuleRegistry,
	BlueBaseModuleRegistryInputItem,
	BlueBaseModuleRegistryItem,
} from './BlueBaseModuleRegistry';
import { DynamicIconProps, RouteConfig } from '@bluebase/components';
import {
	MaybeArray,
	MaybeThunk,
	getDefiniteArray,
	isBlueBaseModule,
	joinPaths,
	resolveThunk,
} from '../utils';
import { ComponentCollection } from './ComponentRegistry';
import { ConfigCollection } from './ConfigRegistry';
import { FilterNestedCollection } from './FilterRegistry';
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
	filters: FilterNestedCollection; // FilterCollectionInput;
	themes: ThemeCollection;
	routes?: MaybeThunk<MaybeArray<RouteConfig>>;
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

	defaultConfigs: ConfigCollection;

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
		filters: {},
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
export function createPlugin(plugin: Partial<Plugin>): PluginInput {
	const { components, filters, themes, routes, value, ...rest } = plugin;

	return {
		categories: [],
		defaultConfigs: {},
		enabled: true,
		name: 'Untitled Plugin',

		...rest,

		value: {
			components: components || {},
			filters: filters || {},
			routes,
			themes: themes || {},

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
			throw Error(`Could not disable plugin. Reason: No plugin registered by key "${key}".`);
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
	 * Creates a map of routes for each plugin
	 *
	 * Ignores plugins if:
	 *
	 * - Plugin is not enabled
	 * - Plugin is not resolved
	 */
	public getRouteMap(prefixPluginKey: boolean = true): { [key: string]: RouteConfig[] } {
		const pluginRoutes: { [key: string]: RouteConfig[] } = {};

		const pluginRoutePathPrefix = this.BB.Configs.getValue('pluginRoutePathPrefix') || '';

		for (const [key, item] of this.entries()) {
			// Skip if pluign is not loaded, or plugin is not enabled
			if ((item.value.isAsync && !item.value.loaded) || !item.enabled) {
				continue;
			}

			// Resolve plugin
			const plugin = inputToPlugin(item.value.module as any);

			// Skip if plugin doesn't have any routes
			if (!plugin.routes) {
				continue;
			}

			// Resolve routes, if it's a thunk
			// Put the resovled value in an array, if it's a single item
			let routes = getDefiniteArray(resolveThunk(plugin.routes, this.BB));

			// Add plugin slug as prefix to top level routes
			routes = routes.map(route => ({
				...route,
				path: joinPaths(pluginRoutePathPrefix, prefixPluginKey ? key : '', route.path),
			}));

			// Put the result in the collective result
			pluginRoutes[key] = routes;
		}

		return pluginRoutes;
	}

	/**
	 * Register a collection of items.
	 * @param collection
	 */
	public async registerCollection(collection: ItemCollection<ItemInputType> = []) {
		// If its an array
		if (Array.isArray(collection)) {
			for (const item of collection) {
				await this.register(createPlugin(item));
			}

			return;
		}
		// If its an object
		else if (collection === Object(collection)) {
			for (const key of Object.keys(collection)) {
				await this.register(key, createPlugin(collection[key]));
			}

			return;
		}

		throw Error('Could not register collection. Reason: Unknown collection type.');
	}

	/**
	 * Convert any input value to an item. This is where you transform inputs and add defualts
	 * @param key
	 * @param partial
	 */
	protected createItem(key: string, partial: any): ItemType {
		return super.createItem(key, createPlugin(partial));
	}

	/**
	 * Typeguard to check a given object is an input value
	 * @param value
	 */
	protected isInputValue(value: any): value is PluginRegistryInputItem['value'] {
		return isBlueBaseModule(value) || typeof value === 'object';
	}
}
