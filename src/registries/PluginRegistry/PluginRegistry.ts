import { BlueRainModule, BlueRainModuleInput } from '../../api';
import { Plugin, PluginInternal, createPlugin } from './Plugin';
import { Registry } from '../Registry';

export class PluginRegistry extends Registry<PluginInternal> {

	public async register(plugin: Plugin | BlueRainModuleInput<Plugin> | BlueRainModule<Plugin>): Promise<void> {

		if (!plugin) {
			throw Error(`No plugin provided in PluginRegistry's register method.`);
		}

		if (!(plugin instanceof BlueRainModule)) {
			plugin = new BlueRainModule(plugin);
		}

		plugin = await plugin.promise;

		const finalPlugin = createPlugin(plugin);

		this.set(finalPlugin.slug, finalPlugin);
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

	public isEnabled(plugin: string | PluginInternal) {
		return this.resolveSlugOrPlugin(plugin).enabled;
	}

	public async enable(plugin: string | PluginInternal) {

		// Fetch plugin
		plugin = this.resolveSlugOrPlugin(plugin);

		// // If the plugin is already enabled, throw
		// if (this.isEnabled(plugin)) {
		// 	// TODO: Do we really need to throw here?
		// 	throw Error(`Cannot enable plugin ${plugin.slug}, it is already enabled.`);
		// }

		// Set plugin flag
		plugin.enabled = true;
		this.set(plugin.slug, plugin);

		// Register plugin hooks
		await this.registerPluginHooks(plugin);

		// Register plugin components
		await this.registerPluginComponents(plugin);

		// Register plugin routes
		await this.registerPluginRoutes(plugin);

		// Call onEnable event hook
		await plugin.onEnable(this.BR);

		// Initialize plugin
		// TODO: Fix configs injection
		await plugin.initialize({}, this.BR);
	}

	public async disablePlugin(plugin: string | PluginInternal) {

		// Fetch plugin
		plugin = this.resolveSlugOrPlugin(plugin);

		// Set plugin flag
		plugin.enabled = false;
		this.set(plugin.slug, plugin);

		// TODO: unregister hooks, etc. Or just re-render take care of it?
	}

	/**
	 * Takes a string or a PluginInternal object. If the input is
	 * a string, it is treated as a slug, and a corresponding PluginInternal
	 * object is fetched from the Registry.
	 *
	 * @param plugin
	 */
	private resolveSlugOrPlugin(plugin: string | PluginInternal) {

		if (typeof plugin === 'string') {
			const fetched = this.get(plugin);

			if (!fetched) {
				throw Error(`Plugin with slug "${plugin}" not found.`);
			}

			plugin = fetched;
		}

		return plugin;
	}

	private async registerPluginHooks(plugin: PluginInternal) {

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