import { Analytics, Logger } from './api';
import {
	ComponentCollection,
	ComponentRegistry,
	ConfigCollection,
	ConfigRegistry,
	HookNestedCollection,
	HookRegistry,
	PluginCollection,
	PluginRegistry,
	ThemeCollection,
	ThemeRegistry,
} from './registries';
import { BlueBaseProvider } from './Context';
import React from 'react';
import { ThemeProvider } from './themes';
import { getComponent } from './getComponent';
import systemHooks from './hooks';

export interface BootOptions {
	components: ComponentCollection,
	configs: ConfigCollection,
	hooks: HookNestedCollection,
	plugins: PluginCollection,
	themes: ThemeCollection,
	// routes: Plugin[]
}

export class BlueBase {

	// APIs
	public Analytics = new Analytics(this);
	public Logger = new Logger(this);

	// Registries
	public Components = new ComponentRegistry(this);
	public Configs = new ConfigRegistry(this);
	public Hooks = new HookRegistry(this);
	public Plugins = new PluginRegistry(this);
	public Themes = new ThemeRegistry(this);

	// Flags
	public booted = false;

	private bootOptions: BootOptions = {
		components: {},
		configs: {},
		hooks: {},
		plugins: [],
		themes: [],
	};

	public async boot(options?: Partial<BootOptions> & { children?: React.ReactNode }) {

		this.bootOptions = { ...this.bootOptions, ...options };

		await this.Hooks.registerNestedCollection(systemHooks);
		await this.Hooks.registerNestedCollection(this.bootOptions.hooks);

		await this.Hooks.run('bluebase.boot', this.bootOptions);

		const SystemApp = getComponent('SystemApp');

		// Set View
		// const SystemApp = this.Components.resolve('SystemApp');
		// SystemApp = await this.Hooks.run('bluebase.system.app', SystemApp);

		const BlueBaseRoot = () => (
			<BlueBaseProvider value={this}>
				<ThemeProvider>
					<SystemApp>
						{options && options.children}
					</SystemApp>
				</ThemeProvider>
			</BlueBaseProvider>
		);

		this.booted = true;

		return BlueBaseRoot;
	}
}