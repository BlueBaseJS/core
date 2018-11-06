import React, { createContext } from 'react';
import { BlueBase } from '../../BlueBase';
import { BlueBaseContext } from '../../Context';
import { Theme } from '../../models';

export interface ThemeProviderProps {
	children: React.ReactNode,
}

export interface ThemeProviderState {
	readonly theme: Theme,
}

export const ThemeContext: React.Context<ThemeProviderState> = createContext(undefined as any);

export class ThemeProvider extends React.Component<ThemeProviderProps, ThemeProviderState> {

	static contextType = BlueBaseContext;

	componentWillMount() {
		const BB: BlueBase = this.context;
		const theme = BB.Themes.getSelectedTheme();

		if (!theme) {
			throw Error('No theme found.');
		}

		this.setState({
			theme,
		});
	}

	render() {

		const BB: BlueBase = this.context;

		const changeTheme = (key: string) => {

			BB.Themes.setSelectedThemeKey(key);
			const theme = BB.Themes.getSelectedTheme();

			if(!theme) {
				throw Error(`Could not change theme. Reason: Theme with the key "${key}" does not exist.`);
			}

			this.setState(() => {
				return {
					theme
				};
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
