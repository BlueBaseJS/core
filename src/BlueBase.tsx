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

import { MaybeRenderPropChildren } from './utils';
import systemFilters from './filters';

export interface BlueBaseProgress {
	/**
	 * Has the app booted yet
	 */
	readonly booted: boolean;

	/**
	 * Are we loading the app
	 */
	readonly loading: boolean;

	/**
	 * Any errors occured while booting the app
	 */
	readonly error: any;
}

export type SetStateFn = (state: BlueBaseProgress) => Promise<void>;

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

export interface BootOptionsInternal extends BootOptions {
	onProgress?: SetStateFn;
	reset?: boolean;
}

const emptyBootOptions: BootOptionsInternal = {
	assets: {},
	components: {},
	configs: {},
	filters: {},
	fonts: {},
	plugins: [],
	themes: [],
};

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

	private bootOptions: BootOptions = emptyBootOptions;

	public async boot({ onProgress, ...options }: Partial<BootOptionsInternal> = {}) {
		// Store onProgress for later use, even after boot finishes (i.e. in reboot, etc)
		if (onProgress) {
			this.onProgress = onProgress;
		}

		await this.onProgress({
			booted: false,
			error: null,
			loading: true,
		});

		try {
			await this.bootInternal(options);
			await this.onProgress({
				booted: this.booted,
				error: null,
				loading: false,
			});
		} catch (error) {
			await this.onProgress({
				booted: false,
				error,
				loading: false,
			});
		}

		return this;
	}

	/**
	 * Performs a reset and boot.
	 */
	public async reset(options?: BootOptionsInternal) {
		return this.boot({ ...options, reset: true });
	}

	/**
	 * Main boot business logic
	 * @param param
	 */
	protected async bootInternal({ reset, ...options }: Partial<BootOptionsInternal>) {
		// Update boot options
		this.bootOptions = { ...this.bootOptions, ...options };

		if (reset === true) {
			await this.Filters.run('bluebase.reset', this.bootOptions);
		}

		// Register basic filters here, so they can be used in boot
		await this.Filters.registerNestedCollection(systemFilters);

		// 🚀 Boot!
		await this.Filters.run('bluebase.boot', this.bootOptions);

		// Set booted flag
		this.booted = true;

		return this;
	}

	private onProgress: SetStateFn = async () => {
		return;
	}
}
