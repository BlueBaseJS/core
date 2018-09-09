import { Plugin, PluginHooks } from './Plugin';
import { BlueRainModule } from '../../api';
import { Registry } from '../Registry';
import { parsePluginHook } from './hook.helpers';
import isFunction from 'lodash.isfunction';
import kebabCase from 'lodash.kebabcase';

export class PluginRegistry extends Registry<Plugin> {

	public async register(plugin: Plugin | BlueRainModule<Plugin>): Promise<void> {

		if (!plugin) {
			throw Error(`No plugin provided in PluginRegistry's register method.`);
		}

		if (!(plugin instanceof BlueRainModule)) {
			plugin = new BlueRainModule(plugin);
		}

		plugin = await plugin.promise;

		if (!plugin.pluginName) {
			throw Error('Plugin name not provided.');
		}

		const slug = kebabCase(plugin.slug ? plugin.slug : plugin.pluginName);

		plugin.slug = slug;

		this.set(slug, plugin);
	}

	public unregister(slug: string) {
		this.delete(slug);
	}

	// public initialize = (slug: string) => {

	// 	const plugin = this.get(slug);

	// 	if (!plugin) {
	// 		throw Error(`Plugin "${slug}" does not exist.`);
	// 	}

	// 	if (plugin.enable === true) {
	// 		this.enable(plugin.slug);
	// 	}

	// }

	public isEnabled(slug: string) {

		const plugin = this.get(slug);

		if (!plugin) {
			throw Error(`Cannot check if plugin ${slug} is enabled, not found.`);
		}

		return plugin.enabled;
	}

	public async enable(slug: string) {

		// Fetch plugin
		const plugin = this.get(slug);

		if (!plugin) {
			throw Error(`Cannot enable plugin ${slug}, not found.`);
		}

		// If the plugin is already enabled, throw
		if (plugin.enabled === true) {
			// TODO: Do we really need to throw here?
			throw Error(`Cannot enable plugin ${slug}, it is already enabled.`);
		}

		// Set plugin flag
		plugin.enabled = true;
		this.set(slug, plugin);

		// Register plugin hooks
		await this.registerPluginHooks(plugin);

		// Register plugin components
		await this.registerPluginComponents(plugin);

		// Register plugin routes
		await this.registerPluginRoutes(plugin);

		// Call onEnable event hook
		if (plugin.onEnable) {
			await plugin.onEnable(this.BR);
		}

		// Initialize plugin
		if (plugin.initialize) {
			// TODO: Fix configs injection
			await plugin.initialize({}, this.BR);
		}
	}

	public async disablePlugin(slug: string): Promise<void> {

		// Fetch plugin
		const plugin = this.get(slug);

		if (!plugin) {
			throw Error(`Cannot enable plugin ${slug}, not found.`);
		}

		// If the plugin is already enabled, throw
		if (plugin.enabled === false) {
			// TODO: Do we really need to throw here?
			throw Error(`Cannot disable plugin ${slug}, it is already disabled.`);
		}

		// Set plugin flag
		plugin.enabled = false;
		this.set(slug, plugin);
	}

	private async registerPluginHooks(plugin: Plugin) {

		if (!plugin.hooks) {
			return;
		}

		// If hooks field is a thunk, then call the thunk function
		let hooks: PluginHooks = isFunction(plugin.hooks) ? await plugin.hooks(this.BR) : plugin.hooks;

		// Is the hooks property a thunk?
		if (isFunction(hooks)) {
			hooks = hooks(this.BR);
		}

		// Extract hook names. These are events that are being subscribed to
		const hookNames = Object.keys(hooks);

		// Iterate over each hook name
		for (const hookName of hookNames) {

			const hookField = hooks[hookName];
			const hookListeners = await parsePluginHook(hookField, hookName, plugin);

			for (const listener of hookListeners) {

				// Register this listener
				await this.BR.Hooks.register(hookName, listener);
			}
			// // Each hookField maybe an array, we create one if its not
			// // We've done this to allow multiple listeners against each hook
			// const hookFieldArr = Array.isArray(hookField) ? hookField : [hookField];

			// let index = 0;

			// // Iterate over each item of hookField
			// for (let hookItem of hookFieldArr) {

			// 	// Each hookField maybe a BlueRainModule, we create one if its not
			// 	hookItem = getBlueRainModule(hookItem);

			// 	// Resolve listener, so if its another bundle, gets loaded here
			// 	hookItem = await hookItem.promise;

			// 	// Final listener object
			// 	const listener = !isFunction(hookItem)
			// 		? hookItem as HookListener
			// 		: { handler: hookItem, name: `${plugin.slug}.${hookName}.${index}` };

			// 	// Get listener name
			// 	// const listenerName = listener.name;
			// 	index++;

			// 	// Register this listener
			// 	await this.BR.Hooks.register(hookName, listener);
			// }

		}


	}

	private registerPluginComponents = (_plugin: Plugin) => {
		// do something
	}

	private registerPluginRoutes = (_plugin: Plugin) => {
		// do something
	}
}