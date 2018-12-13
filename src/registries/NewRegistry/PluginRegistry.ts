import {
	BlueBaseModuleRegistry,
	BlueBaseModuleRegistryInputItem,
	BlueBaseModuleRegistryItem,
} from './BlueBaseModuleRegistry';
import { MaybeThunk, getDefiniteBlueBaseModule, isBlueBaseModule } from '../../utils';
import { ComponentInputCollection } from './ComponentRegistry';
import { DynamicIconProps } from '../../components';

export interface Plugin {
	components: ComponentInputCollection;
	defaultConfigs: any; // ConfigsCollection;
	hooks: any; // HookCollectionInput;
	themes: any; // ThemeItemCollection;
}
export interface PluginRegistryItemExtras {
	/**
	 * Name of the plugin.
	 *
	 * We put it in meta so we can show the name in menu een without downloading
	 * the whole plugin.
	 */
	name: string,

	categories?: any; // PluginCategory | PluginCategory[];
	description?: string,
	version?: string,
	icon?: MaybeThunk<DynamicIconProps>,

	/** Is this plugin currently enabled/ */
	enabled: boolean,
}

/**
 * A PluginInput object where all Plugin properties are optional.
 */
export type PluginInput = Partial<Plugin>;

export type PluginRegistryItem =
	BlueBaseModuleRegistryItem<Plugin> & PluginRegistryItemExtras;

export type PluginRegistryInputItem =
	BlueBaseModuleRegistryInputItem<PluginInput> & Partial<PluginRegistryItemExtras>;

type ItemType = PluginRegistryItem;
type ItemInputType = PluginRegistryInputItem;

// export function createPlugin(plugin: PluginInput) {
// 	const { key, name, description, version, icon, enabled, preload, ...value } = plugin;

// 	return {
// 		key,
// 		meta: {
// 			description,
// 			enabled,
// 			icon,
// 			name,
// 			preload,
// 			version,
// 		},
// 		value,
// 	};
// }

/**
 * 🎨 PluginRegistry
 */
export class PluginRegistry extends BlueBaseModuleRegistry<ItemType, ItemInputType> {

	public async resolve(...keys: string[]) {

		const item = this.findOne(...keys);

		if (!item) {
			throw Error(`Could not resolve any of the following plugins: [${keys.join(', ')}].`);
		}

		return item.value;
	}

	/**
	 * Checks if a plugin is enabled
	 * @param key
	 */
	public isEnabled(key: string) {
		const item = this.get(key);

		if (!item) {
			return false;
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
			return;
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
			return;
		}

		item.enabled = false;
		this.set(key, item);
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
	public hasConfig(_key: string): boolean {
		// FIXME:
		return false;
		// return key.startsWith(`plugin.${this.slug}.`)
		// 	|| Object.keys(this.defaultConfigs).findIndex(k => k === key) >= 0;
	}


	protected createItem(key: string, partial: any): ItemType {

		return super.createItem(key, {
			categories: [],
			enabled: true,
			name: 'Untitled Plugin',
			...partial,

			value: {
				components: {},
				defaultConfigs: {},
				hooks: {},
				themes: {},
				...getDefiniteBlueBaseModule(partial.value)
			},
		});
	}

	/**
	 * Typeguard to check a given object is an input value
	 * @param value
	 */
	protected isInputValue(value: any): value is PluginRegistryInputItem['value'] {
		return isBlueBaseModule(value) || (typeof value === 'object');
	}

}