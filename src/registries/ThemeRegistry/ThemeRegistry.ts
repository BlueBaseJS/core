import { MaybeBlueBaseModule, getDefiniteBlueBaseModule } from '../../utils';
import { Theme, ThemeInput, createTheme } from '../../models';
import { Registry } from '../Registry';
import kebabCase from 'lodash.kebabcase';

export interface ThemeRegistryItem {
	/** Name of theme */
	name: string,

	/** Theme slug, used as an ID. Must be unique */
	slug: string,

	/**
	 * Theme mode: Either light or dark.
	 */
	mode: 'light' | 'dark',

	/**
	 * Sometimes a user wants to switch to the light/dark version of the same theme.
	 * This property has the slug of that theme. For example, if this is a light theme,
	 * this property will have the slug of the dark version, and vice versa.
	 */
	alternate?: string,

	/** Theme object */
	theme: MaybeBlueBaseModule<ThemeInput>,
}

/**
 * A collection (array) of themes. Each theme in this collection maybe a BlueBaseModule.
 */
export type ThemeItemCollection = Array<MaybeBlueBaseModule<ThemeRegistryItem>>;

/**
 * 🎨 ThemeRegistry
 */
export class ThemeRegistry extends Registry<ThemeRegistryItem> {

	/**
	 * Register a ThemeRegistryItem
	 * @param item
	 */
	public async register(item: MaybeBlueBaseModule<ThemeRegistryItem>) {
		const module = await getDefiniteBlueBaseModule(item);

		if (!module.name) {
			throw Error('Could not register Theme. Reason: name property is required.');
		}

		module.slug = kebabCase(module.slug ? module.slug : module.name);

		this.set(module.slug, module);
	}

	/**
	 * Register a ThemeItemCollection
	 */
	public async registerCollection(themes: ThemeItemCollection) {
		for (const theme of themes) {
			await this.register(theme);
		}
	}

	/**
	 * Resolve a theme
	 * @param slug
	 */
	public async resolve(slug: string): Promise<Theme> {
		const item = this.get(slug);

		if (!item) {
			throw Error(`Could not resolve theme. Reason: No theme registered with slug ${slug}.`);
		}

		const theme = await getDefiniteBlueBaseModule(item.theme);
		const overrides: ThemeInput = this.BB.Configs.getValue('theme.overrides');

		// We pass through createTheme to make sure if theme has missed some rules, they're provided
		return createTheme(item.mode, theme, overrides);
	}

	/**
	 * Get alternate version of current theme
	 * @param slug
	 */
	public getAlternate(slug: string) {
		const item = this.get(slug);

		if (item) {
			return item.alternate;
		}

		return;
	}
}