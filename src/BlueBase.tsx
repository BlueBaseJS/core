import { Analytics, Logger } from './api';
import {
	AssetCollection,
	AssetRegistry,
	ComponentCollection,
	ComponentRegistry,
	ConfigCollection,
	ConfigRegistry,
	FilterNestedCollection,
	FilterRegistry,
	FontCollection,
	FontRegistry,
	PluginCollection,
	PluginRegistry,
	ThemeCollection,
	ThemeRegistry,
} from './registries';

import { BlueBaseProvider } from './Context';
import { IntlProvider } from './intl';
import { MaybeRenderPropChildren } from './utils';
import React from 'react';
import { ThemeProvider } from './themes';
import { getComponent } from './getComponent';
import systemFilters from './filters';

const BlueBaseContent = getComponent('BlueBaseContent');

export interface BootOptions {
	/** Collection of assets to add in BlueBase's Asset Registry. */
	assets: AssetCollection;

	/** Collection of components to add in BlueBase's Component Registry. */
	components: ComponentCollection;

	/** Collection of configs to add in BlueBase's Config Registry. */
	configs: ConfigCollection;

	/** Collection of filters to add in BlueBase's Filter Registry. */
	filters: FilterNestedCollection;

	/** Collection of filters to add in BlueBase's Filter Registry. */
	fonts: FontCollection;

	/** Collection of plugins to add in BlueBase's Plugin Registry. */
	plugins: PluginCollection;

	/** Collection of themes to add in BlueBase's Theme Registry. */
	themes: ThemeCollection;

	// routes: Plugin[]

	children?: MaybeRenderPropChildren<{ BB: BlueBase }>;
}

export class BlueBase {
	// APIs
	public Analytics = new Analytics(this);
	public Logger = new Logger(this);

	// Registries
	public Assets = new AssetRegistry(this);
	public Components = new ComponentRegistry(this);
	public Configs = new ConfigRegistry(this);
	public Filters = new FilterRegistry(this);
	public Fonts = new FontRegistry(this);
	public Plugins = new PluginRegistry(this);
	public Themes = new ThemeRegistry(this);

	// Allow other props
	[key: string]: any;

	// Flags
	public booted = false;

	private bootOptions: BootOptions = {
		assets: {},
		components: {},
		configs: {},
		filters: {},
		fonts: {},
		plugins: [],
		themes: [],
	};

	public async boot(options?: Partial<BootOptions> & { children?: React.ReactNode }) {
		// Update boot options
		this.bootOptions = { ...this.bootOptions, ...options };

		// Register basic filters here, so they can be used in boot
		await this.Filters.registerNestedCollection(systemFilters);

		// 🚀 Boot!
		await this.Filters.run('bluebase.boot', this.bootOptions);

		// Navigation
		const navigatorConfigs = await this.Filters.run('bluebase.navigator.root', {});

		// TODO: Move this to BlueBaseApp component
		const BlueBaseRoot = () => (
			<BlueBaseProvider value={this}>
				<ThemeProvider>
					<IntlProvider>
						<BlueBaseContent
							BB={this}
							children={this.bootOptions.children}
							navigator={navigatorConfigs}
						/>
					</IntlProvider>
				</ThemeProvider>
			</BlueBaseProvider>
		);

		this.booted = true;

		return BlueBaseRoot;
	}
}
