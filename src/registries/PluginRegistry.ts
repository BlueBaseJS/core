import {
	BlueBaseModuleRegistry,
	BlueBaseModuleRegistryInputItem,
	BlueBaseModuleRegistryItem,
} from './BlueBaseModuleRegistry';
import { DynamicIconProps, RouteConfig } from '@bluebase/components';
import {
	MaybeArray,
	MaybePromise,
	MaybeThunk,
	getDefiniteArray,
	getDefinitePromise,
	isBlueBaseModule,
	isPromise,
	joinPaths,
	resolveThunk,
} from '../utils';

import { AssetCollection } from './AssetRegistry';
import { BlueBase } from '../BlueBase';
import { ComponentCollection } from './ComponentRegistry';
import { ConfigCollection } from './ConfigRegistry';
import { FilterNestedCollection } from './FilterRegistry';
import { FontCollection } from './FontRegistry';
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
	assets: AssetCollection;
	components: ComponentCollection;
	filters: FilterNestedCollection;
	fonts: FontCollection;
	themes: ThemeCollection;
	routes?: MaybeThunk<MaybePromise<MaybeArray<RouteConfig>>>;
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

	/** Default plugin configs */
	defaultConfigs: ConfigCollection;

	/** Plugin Path */
	path?: string;

	[key: string]: any;
}

export type PluginRegistryItem = BlueBaseModuleRegistryItem<PluginValue> & PluginRegistryItemExtras;
export type PluginRegistryInputItem = BlueBaseModuleRegistryInputItem<
	PluginValueInput,
	Partial<PluginRegistryItemExtras>
>;

type ItemType = PluginRegistryItem;
type ItemInputType = PluginRegistryInputItem;

export type Plugin = PluginRegistryItemExtras & PluginValue;
export type PluginInput = PluginRegistryInputItem;

export type PluginCollection = ItemCollection<PluginInput>;

export async function inputToPlugin(plugin: PluginInput, BB: BlueBase): Promise<Plugin> {
	const { value, ...rest } = plugin;

	const resolvedValue = await value;

	const routes = await resolveRoutes(
		plugin.routes || (resolvedValue && resolvedValue.routes) || [],
		BB
	);

	const final = {
		assets: {},
		components: {},
		defaultConfigs: {},
		enabled: true,
		filters: {},
		fonts: {},
		name: 'Untitled Plugin',
		themes: {},

		...rest,
		...value,

		routes,
	};

	// FIXME: Fix typing hell in this project please
	return final as any;
}

/**
 * Creates a BlueBase plugin from input params
 * @param plugin
 */
export function createPlugin(plugin: Partial<Plugin>): PluginInput {
	const { assets, components, filters, fonts, themes, routes, value, ...rest } = plugin;

	return {
		categories: [],
		defaultConfigs: {},
		enabled: true,
		name: 'Untitled Plugin',

		...rest,

		value: {
			assets: assets || {},
			components: components || {},
			filters: filters || {},
			fonts: fonts || {},
			routes,
			themes: themes || {},

			...value,
		},
	};
}

export async function resolveRoutes(
	routes: PluginValue['routes'],
	BB: BlueBase
): Promise<RouteConfig[]> {
	// If thunk resolve it
	let finalRoutes = resolveThunk(routes || [], BB);

	// If result is a promise, resolve it too
	if (isPromise(finalRoutes)) {
		finalRoutes = await getDefinitePromise(finalRoutes);
	}

	// Make sure we have an array
	return getDefiniteArray(finalRoutes);
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

		const input = { ...item, value: await item.value };

		return inputToPlugin(input, this.BB);
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
	 * Returns all enabled plugins
	 */
	public async getAllEnabled() {
		const map = this.filterValues((_value, key) => this.isEnabled(key));
		return Promise.all(Object.values(map));
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
	public async getRouteMap(
		prefixPluginKey: boolean = true
	): Promise<{ [key: string]: RouteConfig[] }> {
		const pluginRoutes: { [key: string]: RouteConfig[] } = {};

		const pluginRoutePathPrefix = this.BB.Configs.getValue('pluginRoutePathPrefix') || '';

		for (const [key, item] of this.entries()) {
			// Skip if pluign is not loaded, or plugin is not enabled
			if ((item.value.isAsync && !item.value.loaded) || !item.enabled) {
				continue;
			}

			// Resolve plugin
			const plugin = await inputToPlugin(item.value.module as any, this.BB);

			// Resolve routes, if it's a thunk
			// Put the resovled value in an array, if it's a single item
			// FIXME: Actually, inputToPlugin return value as routes prop resolved.
			// Remove typecasting in future and fix typings
			let routes = plugin.routes as RouteConfig[];

			// Skip if plugin doesn't have any routes
			if (!routes || routes.length === 0) {
				continue;
			}

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
				await this.register(item);
			}

			return;
		}
		// If its an object
		else if (collection === Object(collection)) {
			for (const key of Object.keys(collection)) {
				await this.register(key, collection[key]);
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
		return super.createItem(key, {
			...createPlugin(partial),
			path: this.createPath(key, partial),
		});
	}

	/**
	 * Generates a path for the given plugin
	 * @param key
	 * @param plugin
	 */
	protected createPath(key: string, plugin: Partial<Plugin>) {
		const pluginRoutePathPrefix = this.BB.Configs.getValue('pluginRoutePathPrefix') || '';

		// Resolve routes, if it's a thunk
		// Put the resovled value in an array, if it's a single item
		const routes = getDefiniteArray(
			resolveThunk(plugin.routes || plugin.value.routes || [], this.BB)
		);

		// Skip if plugin doesn't have any routes
		if (!routes || routes.length === 0) {
			return;
		}

		return joinPaths(pluginRoutePathPrefix, key);
	}

	/**
	 * Typeguard to check a given object is an input value
	 * @param value
	 */
	protected isInputValue(value: any): value is PluginRegistryInputItem['value'] {
		return isBlueBaseModule(value) || typeof value === 'object';
	}
}
