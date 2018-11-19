import { MaybeBlueBaseModuleOrInput, getDefiniteBlueBaseModule } from '../../utils';
import { Theme, createTheme } from '../../models';
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
	theme: MaybeBlueBaseModuleOrInput<Partial<Theme>>,
}

export type ThemeItemCollection = Array<MaybeBlueBaseModuleOrInput<ThemeRegistryItem>>;

/**
 * 🎨 ThemeRegistry
 */
export class ThemeRegistry extends Registry<ThemeRegistryItem> {

	public async register(item: MaybeBlueBaseModuleOrInput<ThemeRegistryItem>) {
		const module = await getDefiniteBlueBaseModule(item).promise;

		if (!module.name) {
			throw Error('Could not register Theme. Reason: name property is required.');
		}

		module.slug = kebabCase(module.slug ? module.slug : module.name);

		this.set(module.slug, module);
	}

	public async registerCollection(themes: ThemeItemCollection) {
		for (const theme of themes) {
			await this.register(theme);
		}
	}

	public async resolve(slug: string): Promise<Theme> {
		const item = this.get(slug);

		if (!item) {
			throw Error(`Could not resolve theme. Reason: No theme registered with slug ${slug}.`);
		}

		const theme = await getDefiniteBlueBaseModule(item.theme).promise;
		const overrides: Partial<Theme> = this.BB.Configs.getValue('theme.overrides');

		// We pass through createTheme to make sure if theme has missed some rules, they're provided
		return createTheme(item.mode, theme, overrides);
	}

	/**
	 * Unregisters a theme
	 * @param slug Theme slug
	 */
	public unregister(slug: string) {
		this.delete(slug);
		// TODO: Do we force rerender/reboot?
	}

	public getAlternate(slug: string) {
		const item = this.get(slug);

		if (item) {
			return item.alternate;
		}

		return;
	}
}