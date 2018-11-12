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
 *
 * TODO: This provider doesn't listen to theme config changes done elsewhere, implement this.
 * Relevant issue: https://github.com/BlueBaseJS/core/issues/19
 */
export class ThemeProvider extends React.Component<ThemeProviderProps, ThemeProviderState> {

	static contextType = BlueBaseContext;

	componentWillMount() {
		const BB: BlueBase = (this as any).context;
		this.setTheme(this.props.theme, BB);
	}

	setTheme(slug: string | undefined, BB: BlueBase) {
		const key = slug || BB.Configs.get('theme');

		const theme = BB.Themes.get(key);

		if (!theme) {
			throw Error(`Could not set theme. Reason: Theme with the key "${key}" does not exist.`);
		}

		this.setState({ theme });
	}

	render() {

		const BB: BlueBase = (this as any).context;

		const changeTheme = (slug: string) => {
			BB.Configs.register('theme', slug).then(() => {
				this.setTheme(slug, BB);
			});
		};

		const value = {
			changeTheme,
			theme: this.state.theme,
		};

		return (
      <ThemeContext.Provider value={value} children={this.props.children} />
		);
	}
}
