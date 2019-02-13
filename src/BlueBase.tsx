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
import { RouterProviderProps } from './components';
import { ThemeProvider } from './themes';
import { renderChildrenWithProps } from './utils';
import systemHooks from './hooks';

export interface BootOptions {

	/** Collection of components to add in BlueBase's Component Registry. */
	components: ComponentCollection,

	/** Collection of configs to add in BlueBase's Config Registry. */
	configs: ConfigCollection,

	/** Collection of hooks to add in BlueBase's Hook Registry. */
	hooks: HookNestedCollection,

	/** Collection of plugins to add in BlueBase's Plugin Registry. */
	plugins: PluginCollection,

	/** Collection of themes to add in BlueBase's Theme Registry. */
	themes: ThemeCollection,

	// routes: Plugin[]

	children?: React.ReactNode,
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

		// Update boot options
		this.bootOptions = { ...this.bootOptions, ...options };

		// Register basic hooks here, so they can be used in boot
		await this.Hooks.registerNestedCollection(systemHooks);
		await this.Hooks.registerNestedCollection(this.bootOptions.hooks);

		// 🚀 Boot!
		await this.Hooks.run('bluebase.boot', this.bootOptions);

		// If children prop is given, use it. Otherwise use build-in routing and SystemApp
		let children: React.ReactNode;

		if (this.bootOptions.children) {
			children = renderChildrenWithProps(this.bootOptions.children, { BB: this });
		} else {
			const routes: RouterProviderProps = await this.Hooks.run('bluebase.routes.root', {} as any);
			const RouterProvider = this.Components.resolve('RouterProvider');
			children = <RouterProvider routes={routes} />;
		}

		// const SystemApp = getComponent('SystemApp');
		// Set View
		// const SystemApp = this.Components.resolve('SystemApp');
		// SystemApp = await this.Hooks.run('bluebase.system.app', SystemApp);

		const BlueBaseRoot = () => (
			<BlueBaseProvider value={this}>
				<ThemeProvider>
				{children}
				</ThemeProvider>
			</BlueBaseProvider>
		);

		this.booted = true;

		return BlueBaseRoot;
	}
}