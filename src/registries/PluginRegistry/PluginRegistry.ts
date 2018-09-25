import { MaybeBlueRainModuleOrInput, getDefiniteBlueRainModule, isClass } from '../../utils';
import { Registry } from '../Registry';
import { Plugin } from '../../models/Plugin';
import { PluginInput } from './types';
import { isPluginInput } from './helpers';

export class PluginRegistry extends Registry<Plugin> {

	public async register(plugin: MaybeBlueRainModuleOrInput<typeof Plugin | Plugin | PluginInput>): Promise<void> {

		if (!plugin) {
			throw Error(`Could not register plugin. Reason: No plugin provided in PluginRegistry's register method.`);
		}

		plugin = await getDefiniteBlueRainModule(plugin).promise;

		let finalPlugin;

		if (plugin instanceof Plugin) {
			finalPlugin = plugin;
		}
		else if (isPluginInput(plugin)) {
			finalPlugin = (new Plugin(plugin));
		}
		else if (isClass(plugin)) {
			const classObj = (new (plugin as typeof Plugin)());

			if (classObj instanceof Plugin) {
				finalPlugin = classObj;
			}
		}

		if(!finalPlugin) {
			throw Error('Could not register plugin. Reason: Input variable is not a plugin.');
		}

		finalPlugin = finalPlugin.setup();
		this.set(finalPlugin.slug, finalPlugin);
	}

	public unregister(slug: string) {
		this.delete(slug);
		// TODO: Do we force rerender/reboot?
	}

	public isEnabled(plugin: string | Plugin) {
		return this.getFromSlugOrPlugin(plugin).isEnabled();
	}

	public async enable(plugin: string | Plugin) {
		// TODO: Do we force rerender/reboot?

		// Fetch plugin
		plugin = this.getFromSlugOrPlugin(plugin);

		// Set plugin flag
		plugin.enable();
		this.set(plugin.slug, plugin);
	}

	public async disable(plugin: string | Plugin) {
		// TODO: Do we force rerender/reboot?

		// Fetch plugin
		plugin = this.getFromSlugOrPlugin(plugin);

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