import React, { createContext } from 'react';
import { BlueBase } from '../../BlueBase';
import { BlueBaseContext } from '../../Context';
import { Theme } from './Theme/theme';


export interface ThemeProviderProps {
	children: React.ReactNode,
}

export interface ThemeProviderState {
	readonly theme: Theme,
	readonly changeTheme: (key: string) => void,
}

export const ThemeContext: React.Context<ThemeProviderState> = createContext(undefined as any);

export class ThemeProvider extends React.Component<ThemeProviderProps, ThemeProviderState> {

	static contextType = BlueBaseContext;

	constructor(props: ThemeProviderProps) {
		super(props);

		const BB: BlueBase = this.context;

		this.state = {
			changeTheme: this.changeTheme,
			theme: BB.Themes.getSelectedTheme(),
		};
	}

	public changeTheme(key: string) {

		const BB: BlueBase = this.context;

		if(!BB.Themes.has(key)) {
			throw Error(`Could not change theme. Reason: Theme with the key "${key}" does not exist.`);
		}

		BB.Themes.setSelectedThemeKey(key);

		this.setState(state => {
			return {
				theme: BB.Themes.get(key)
			};
		});
	}

	render() {
		return (
      <ThemeContext.Provider value={this.state}>
        {this.props.children}
      </ThemeContext.Provider>
		);
	}
}
