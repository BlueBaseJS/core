import React, { createContext } from 'react';
import { Theme, ThemeInput } from '../../models';
import { BlueBase } from '../../BlueBase';
import { BlueBaseContext } from '../../Context';
import deepmerge  from 'deepmerge';

export interface ThemeProviderProps {
	theme?: string;
	overrides?: ThemeInput;
	children: React.ReactNode,
}

export interface ThemeProviderState {
	readonly theme: Theme,
}

/** Interface of param passed to the ThemeConsumer render prop method. */
export interface ThemeContextData {

	// Helper method to change current theme.
	changeTheme: (slug: string) => void,

	// Current theme
	theme: Theme
}

export const ThemeContext: React.Context<ThemeContextData> = createContext(undefined as any);

export const ThemeConsumer = ThemeContext.Consumer;

/**
 * 🎨 ThemeProvider
 *
 * FIXME: This doesn't handle loading state yet. i.e. When async theme is loading
 */
export class ThemeProvider extends React.Component<ThemeProviderProps, ThemeProviderState> {

	static contextType = BlueBaseContext;

	/** Stores configuration subscription ID */
	private subscriptionId?: string;

	async componentWillMount() {
		const BB: BlueBase = (this as any).context;
		const { theme, overrides = {} } = this.props;

		this.setTheme(theme, overrides, BB);

		// Subscribe to theme config updates
		if (!theme) {

			this.subscriptionId = BB.Configs.subscribe('theme.name', (value) => {
				this.setTheme(value, overrides, BB);
			});
		}
	}

	componentWillUnmount() {
		const BB: BlueBase = (this as any).context;

		// Unsubscribe from theme config updates
		if(this.subscriptionId) {
			BB.Configs.unsubscribe('theme.name', this.subscriptionId);
			delete this.subscriptionId;
		}
	}

	/**
	 * Sets a theme to Provider's state. If a theme key is given, it is used,
	 * otherwise global theme is used.
	 *
	 * @param slug
	 * @param BB
	 */
	async setTheme(slug: string | undefined, overrides: ThemeInput, BB: BlueBase) {
		const key = slug || BB.Configs.getValue('theme.name');

		const theme = await BB.Themes.resolve(key);

		if (!theme) {
			throw Error(`Could not change theme. Reason: Theme with the key "${key}" does not exist.`);
		}

		this.setState({ theme: deepmerge(theme, overrides) as Theme });
	}

	render() {

		const BB: BlueBase = (this as any).context;

		if (!this.state || !this.state.theme) {
			return null;
		}

		const value: ThemeContextData = {
			changeTheme: (slug: string) => { BB.Configs.register('theme.name', slug); },
			theme: this.state.theme
		};

		return (
      <ThemeContext.Provider value={value} children={this.props.children} />
		);
	}
}
