import { MaybeBlueBaseModule, getDefiniteBlueBaseModule, isClass } from '../../utils';
import { Plugin } from '../../models/Plugin';
import { PluginInput } from './types';
import { Registry } from '../Registry';
import { isPluginInput } from './helpers';

export class PluginRegistry extends Registry<Plugin> {

	/**
	 * Registers a Plugin. Input can be any of the following:
	 *
	 * - A Plugin Class
	 * - An instance of Plugin Class
	 * - An object that has similar properties to a Plugin object (PluginInput)
	 *
	 * Moreover all of these can be split into BlueBaseModules
	 *
	 * @param plugin Input
	 */
	public async register(plugin: MaybeBlueBaseModule<typeof Plugin | Plugin | PluginInput>): Promise<void> {

		if (!plugin) {
			throw Error(`Could not register plugin. Reason: No plugin provided in PluginRegistry's register method.`);
		}

		plugin = await getDefiniteBlueBaseModule(plugin);

		let finalPlugin;

		// If pluign is an instance of Plugin class
		if (plugin instanceof Plugin) {
			finalPlugin = plugin;
		}

		// If plugin is an object
		else if (isPluginInput(plugin)) {
			finalPlugin = (new Plugin(plugin));
		}

		// If plugin is a Class
		else if (isClass(plugin)) {
			const classObj = (new (plugin as typeof Plugin)());

			// If this object is not an instance of Plugin,
			// it means its no a Plugin at all.
			if (classObj instanceof Plugin) {
				finalPlugin = classObj;
			}
		}

		// If none of the above
		if(!finalPlugin) {
			throw Error('Could not register plugin. Reason: Input variable is not a plugin.');
		}

		// Run setup
		finalPlugin = finalPlugin.setup();

		// Save
		this.set(finalPlugin.slug, finalPlugin);
	}

	/**
	 * Unregisters a plugin
	 * @param slug Plugin slug
	 */
	public unregister(slug: string) {
		this.delete(slug);
	}

	/**
	 * Checks if a plugin is enabled
	 * @param plugin Plugin slug or the plugin object itself
	 */
	public isEnabled(plugin: string | Plugin) {
		return this.getFromSlugOrPlugin(plugin).isEnabled();
	}

	/**
	 * Enable a plugin
	 * @param plugin Plugin slug or the plugin object itself
	 */
	public async enable(plugin: string | Plugin) {

		// Fetch plugin
		plugin = this.getFromSlugOrPlugin(plugin);

		// Set plugin flag
		plugin.enable();
		this.set(plugin.slug, plugin);
	}

	/**
	 * Disable a plugin
	 * @param plugin Plugin slug or the plugin object itself
	 */
	public async disable(plugin: string | Plugin) {

		// Fetch plugin
		plugin = this.getFromSlugOrPlugin(plugin);

		// Set plugin flag
		plugin.disable();
		this.set(plugin.slug, plugin);
	}

	/**
	 * Takes a string or a Plugin object. If the input is
	 * a string, it is treated as a slug, and a corresponding Plugin
	 * object is fetched from the Registry.
	 *
	 * @param plugin
	 */
	private getFromSlugOrPlugin(plugin: string | Plugin) {

		if (typeof plugin === 'string') {
			const fetched = this.get(plugin);

			if (!fetched) {
				throw Error(`Plugin with slug "${plugin}" not found.`);
			}

			plugin = fetched;
		}

		return plugin;
	}
}