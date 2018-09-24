import { MaybeBlueRainModuleOrInput, getDefiniteBlueRainModule } from '../../utils';
import { Registry } from '../Registry';
import { Plugin } from '../../models/Plugin';
import { PluginInput } from './types';

export class PluginRegistry extends Registry<Plugin> {

	public async register(plugin: MaybeBlueRainModuleOrInput<Plugin | PluginInput>): Promise<void> {

		if (!plugin) {
			throw Error(`No plugin provided in PluginRegistry's register method.`);
		}

		plugin = getDefiniteBlueRainModule(plugin);

		plugin = await plugin.promise;

		if (plugin instanceof Plugin) {
			this.set(plugin.slug, plugin);
		} else {
			const finalPlugin = new Plugin(plugin);
			this.set(finalPlugin.slug, finalPlugin);
		}
	}

	public unregister(slug: string) {
		this.delete(slug);
	}

	/**
	 * Initializes all "enabled" plugins
	 */
	public async initialize() {

		for (const entry of this.data) {
			if (this.isEnabled(entry['1'])) {
				await this.enable(entry['1']);
			}
		}
	}

	public isEnabled(plugin: string | Plugin) {
		return this.resolveSlugOrPlugin(plugin).isEnabled();
	}

	public async enable(plugin: string | Plugin) {

		// Fetch plugin
		plugin = this.resolveSlugOrPlugin(plugin);

		// // If the plugin is already enabled, throw
		// if (this.isEnabled(plugin)) {
		// 	// TODO: Do we really need to throw here?
		// 	throw Error(`Cannot enable plugin ${plugin.slug}, it is already enabled.`);
		// }

		// Set plugin flag
		// plugin.isEnabled = true;
		this.set(plugin.slug, plugin);

		// Register plugin hooks
		await this.registerPluginHooks(plugin);

		// Register plugin components
		await this.registerPluginComponents(plugin);

		// Register plugin routes
		await this.registerPluginRoutes(plugin);

		// // Call onEnable event hook
		// await plugin.onEnable(this.BR);

		// Initialize plugin
		// TODO: Fix configs injection
		await plugin.initialize({}, this.BR);
	}

	public async disablePlugin(plugin: string | Plugin) {

		// Fetch plugin
		plugin = this.resolveSlugOrPlugin(plugin);

		// Set plugin flag
		plugin.disable();
		this.set(plugin.slug, plugin);

		// TODO: unregister hooks, etc. Or just re-render take care of it?
	}

	/**
	 * Takes a string or a Plugin object. If the input is
	 * a string, it is treated as a slug, and a corresponding Plugin
	 * object is fetched from the Registry.
	 *
	 * @param plugin
	 */
	private resolveSlugOrPlugin(plugin: string | Plugin) {

		if (typeof plugin === 'string') {
			const fetched = this.get(plugin);

			if (!fetched) {
				throw Error(`Plugin with slug "${plugin}" not found.`);
			}

			plugin = fetched;
		}

		return plugin;
	}

	private async registerPluginHooks(plugin: Plugin) {

		await this.BR.Hooks.registerCollection(
			plugin.hooks,
			(hookName: string, index: number) => `${plugin.slug}.${hookName}.${index}`
		);

	}

	private registerPluginComponents = (_plugin: Plugin) => {
		// do something
	}

	private registerPluginRoutes = (_plugin: Plugin) => {
		// do something
	}
}