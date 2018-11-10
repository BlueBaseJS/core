import { ComponentRegistry, HookCollection, HookRegistry, PluginRegistry } from './registries';
import { BlueBaseProvider } from './Context';
import { ComponentInput } from './registries/ComponentRegistry/types';
import { ComponentRegistryWithUIInterfaces as IComponentRegistry } from './ui-interfaces';
import { Logger } from './api';
import { MaybeBlueBaseModuleOrInput } from './utils';
import { Plugin } from './models/Plugin';
import React from 'react';
import systemHooks from './hooks';

export interface BootOptions {

	plugins: Array<MaybeBlueBaseModuleOrInput<Plugin>>;
	components: { [key: string]: ComponentInput };
	hooks: HookCollection;
	// routes: Plugin[]
	// configs: Plugin[]
}

export class BlueBase {

	// APIs
	public Logger = new Logger(this);

	// Registries
	public Components: IComponentRegistry = new ComponentRegistry(this) as IComponentRegistry;
	public Hooks: HookRegistry = new HookRegistry(this);
	public Plugins: PluginRegistry = new PluginRegistry(this);

	// Flags
	public booted = false;

	private bootOptions: BootOptions = {
		components: {},
		// config: {},
		hooks: {},
		plugins: [],
	};

	public async boot(options?: Partial<BootOptions>) {

		this.bootOptions = { ...this.bootOptions, ...options };

		await this.Hooks.registerCollection(systemHooks);
		await this.Hooks.registerCollection(this.bootOptions.hooks);

		await this.Hooks.run('bluebase.boot', this.bootOptions);

		// Set View
		// const SystemApp = this.Components.resolve('SystemApp');
		// SystemApp = await this.Hooks.run('bluebase.system.app', SystemApp);

		const BluerainApp = () => (
			<BlueBaseProvider value={this}>
				<this.Components.SystemApp />
			</BlueBaseProvider>
		);

		this.booted = true;

		return BluerainApp;
	}
}