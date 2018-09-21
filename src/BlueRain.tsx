import { ComponentRegistry, HookCollection, HookRegistry, PluginRegistry } from './registries';
import { BlueRainProvider } from './Context';
import { Logger } from './api';
import React from 'react';
import systemHooks from './hooks';

export interface BootOptions {

	// plugins: Plugin[]
	// components: Plugin[]
	hooks: HookCollection
	// routes: Plugin[]
	// configs: Plugin[]
}

export class BlueRain {

	// APIs
	public Logger = new Logger(this);

	// Registries
	public Components: ComponentRegistry = new ComponentRegistry(this);
	public Hooks: HookRegistry = new HookRegistry(this);
	public Plugins: PluginRegistry = new PluginRegistry(this);

	// Flags
	public booted = false;

	private bootOptions: BootOptions = {
		// config: {},
		hooks: {},
		// plugins: [],
	};

	public async boot(options?: BootOptions) {

		this.bootOptions = { ...this.bootOptions, ...options };

		await this.Hooks.registerMany(systemHooks);
		await this.Hooks.registerMany(this.bootOptions.hooks);

		await this.Hooks.run('bluerain.boot', this.bootOptions);

		// Set View
		// const SystemApp = this.Components.resolve('SystemApp');
		// SystemApp = await this.Hooks.run('bluerain.system.app', SystemApp);

		const BluerainApp = () => (
			<BlueRainProvider value={this}>
				<this.Components.SystemApp />
			</BlueRainProvider>
		);

		this.booted = true;

		return BluerainApp;
	}
}