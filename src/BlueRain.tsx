import { ComponentRegistry, HookRegistry, PluginRegistry } from './registries';
import { BlueRainProvider } from './Context';
import { Logger } from './api';
import { register as registerInternalComponents } from './components';
import React from 'react';

export class BlueRain {

	// APIs
	public Logger = new Logger(this);

	// Registries
	public Components: ComponentRegistry = new ComponentRegistry(this);
	public Hooks: HookRegistry = new HookRegistry(this);
	public Plugins: PluginRegistry = new PluginRegistry(this);

	// Flags
	public booted = false;

	public async boot() {

		await registerInternalComponents(this);

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