import { Analytics, Logger } from './api';
import systemFilters from './filters';
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
	// Allow other props
	// eslint-disable-next-line no-undef
	[key: string]: any;

	/** BlueBase Version */
	readonly version: string = VERSION;

	// APIs
	public Analytics: Analytics = new Analytics(this);
	public Logger: Logger = new Logger(this);

	// Registries
	public Assets: AssetRegistry = new AssetRegistry(this);
	public Components: ComponentRegistry = new ComponentRegistry(this);
	public Configs: ConfigRegistry = new ConfigRegistry(this);
	public Filters: FilterRegistry = new FilterRegistry(this);
	public Fonts: FontRegistry = new FontRegistry(this);
	public Plugins: PluginRegistry = new PluginRegistry(this);
	public Themes: ThemeRegistry = new ThemeRegistry(this);

	// Flags
	public booted: boolean = false;

	private bootOptions: BootOptions = emptyBootOptions;

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
	 * Performs boot, and resets whole view heirarchy
	 */
	public reboot: (reset?: boolean) => Promise<void> = async (reset?: boolean) => {
		// This is just a stub funnction. It is replaced by BlueBaseApp
		this.boot({ reset });
	};

	/**
	 * Performs a reset and boot. Does not unmount the whole app.
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
	};
}
