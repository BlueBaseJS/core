import React, { createContext } from 'react';
import { BlueBase } from '../../BlueBase';
import { BlueBaseContext } from '../../Context';
import { Theme } from '../../models';

export interface ThemeProviderProps {
	theme?: string;
	overrides?: Partial<Theme>;
	children: React.ReactNode,
}

export interface ThemeProviderState {
	readonly theme: Theme,
}

export const ThemeContext: React.Context<ThemeProviderState> = createContext(undefined as any);

/**
 * 🎨 ThemeProvider
 */
export class ThemeProvider extends React.Component<ThemeProviderProps, ThemeProviderState> {

	static contextType = BlueBaseContext;

	/** Stores configuration subscription ID */
	private subscriptionId?: string;

	async componentWillMount() {
		const BB: BlueBase = (this as any).context;
		this.setTheme(this.props.theme, BB);

		// Subscribe to theme config updates
		if (!this.props.theme) {

			this.subscriptionId = BB.Configs.subscribe('theme', (value) => {
				this.setTheme(value, BB);
			});
		}
	}

	componentWillUnmount() {
		const BB: BlueBase = (this as any).context;

		// Unsubscribe from theme config updates
		if(this.subscriptionId) {
			BB.Configs.unsubscribe('theme', this.subscriptionId);
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
	setTheme(slug: string | undefined, BB: BlueBase) {
		const key = slug || BB.Configs.getValue('theme');

		const theme = BB.Themes.get(key);

		if (!theme) {
			throw Error(`Could not set theme. Reason: Theme with the key "${key}" does not exist.`);
		}

		this.setState({ theme });
	}

	render() {

		const BB: BlueBase = (this as any).context;

		const value = {
			changeTheme: (slug: string) => { BB.Configs.register('theme', slug); },
			theme: this.state.theme
		};

		return (
      <ThemeContext.Provider value={value} children={this.props.children} />
		);
	}
}
