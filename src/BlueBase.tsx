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
import { VERSION } from './version';
import systemFilters from './filters';

export interface BlueBaseProgress {
	/**
	 * Percentage progress of boot. Number between 0-100.
	 */
	progress?: number;

	/**
	 * Progress status message
	 */
	message?: string;

	/**
	 * Any errors occurred while booting the app
	 */
	error?: any;
}

export type BlueBaseBootProgressCallback = (state: BlueBaseProgress) => void;

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
	onProgress?: BlueBaseBootProgressCallback;
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
	/** BlueBase Version */
	readonly version = VERSION;

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

	public reboot: () => Promise<void> = async () => {
		this.boot();
	}

	public async boot({ onProgress, ...options }: Partial<BootOptionsInternal> = {}) {
		// Store onProgress for later use, even after boot finishes (i.e. in reboot, etc)
		if (onProgress) {
			this.onProgress = onProgress;
		}

		this.onProgress({
			message: 'Initiating...',
			progress: 0,
		});

		try {
			await this.bootInternal(options);
		} catch (error) {
			this.onProgress({ error });
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
		const onProgress = this.onProgress;

		// Update boot options
		this.bootOptions = { ...this.bootOptions, ...options };

		if (reset === true) {
			await this.Filters.run('bluebase.reset', this.bootOptions, { onProgress });
			onProgress({
				message: 'Reseting...',
				progress: 10,
			});
		}

		// Register basic filters here, so they can be used in boot
		await this.Filters.registerNestedCollection(systemFilters);
		onProgress({
			message: 'Loading system defaults',
			progress: 20,
		});

		// 🚀 Boot!
		await this.Filters.run('bluebase.boot', this.bootOptions, { onProgress });

		// Set booted flag
		this.booted = true;

		onProgress({
			message: 'Done!',
			progress: 100,
		});

		return this;
	}

	private onProgress: BlueBaseBootProgressCallback = () => {
		return;
	}
}
