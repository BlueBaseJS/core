import { Analytics, Logger } from './api';
import {
	ComponentCollection,
	ComponentRegistry,
	ConfigCollection,
	ConfigRegistry,
	FilterNestedCollection,
	FilterRegistry,
	PluginCollection,
	PluginRegistry,
	ThemeCollection,
	ThemeRegistry,
} from './registries';
import { BlueBaseProvider } from './Context';
import React from 'react';
import { ThemeProvider } from './themes';
import { renderChildrenWithProps } from './utils';
import systemFilters from './filters';

export interface BootOptions {

	/** Collection of components to add in BlueBase's Component Registry. */
	components: ComponentCollection,

	/** Collection of configs to add in BlueBase's Config Registry. */
	configs: ConfigCollection,

	/** Collection of filters to add in BlueBase's Filter Registry. */
	filters: FilterNestedCollection,

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
	public Filters = new FilterRegistry(this);
	public Plugins = new PluginRegistry(this);
	public Themes = new ThemeRegistry(this);

	// Flags
	public booted = false;

	private bootOptions: BootOptions = {
		components: {},
		configs: {},
		filters: {},
		plugins: [],
		themes: [],
	};

	public async boot(options?: Partial<BootOptions> & { children?: React.ReactNode }) {

		// Update boot options
		this.bootOptions = { ...this.bootOptions, ...options };

		// Register basic filters here, so they can be used in boot
		await this.Filters.registerNestedCollection(systemFilters);
		await this.Filters.registerNestedCollection(this.bootOptions.filters);

		// 🚀 Boot!
		await this.Filters.run('bluebase.boot', this.bootOptions);

		// Navigation
		const Navigation = this.Components.resolve('Navigation');
		const navigatorConfigs = await this.Filters.run('bluebase.navigator.root', {});

		const BlueBaseRoot = () => (
			<BlueBaseProvider value={this}>
				<ThemeProvider>
				{
					(this.bootOptions.children)
					? renderChildrenWithProps(this.bootOptions.children, { BB: this })
					: <Navigation navigator={navigatorConfigs} />
				}
				</ThemeProvider>
			</BlueBaseProvider>
		);

		this.booted = true;

		return BlueBaseRoot;
	}
}