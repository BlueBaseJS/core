import React, { createContext } from 'react';
import { BlueBase } from '../BlueBase';
import { BlueBaseContext } from '../Context';
import { Theme } from '../registries';
import { ThemeValueInput } from './structure';
import deepmerge from 'deepmerge';

/**
 * Props of the `ThemeProvider` component.
 */
export interface ThemeProviderProps {

	/**
	 * Key of the theme to use for children components. If this prop is not set,
	 * the globally selected theme is used.
	 */
	theme?: string;

	/**
	 * Any custom overrides to the selected theme.
	 */
	overrides?: ThemeValueInput;

	children: React.ReactNode,
}

export interface ThemeProviderState {
	readonly loading: boolean,
	readonly theme?: Theme,
	readonly error?: any,
}

/**
 * Interface of object passed as param to the ThemeConsumer render prop method.
 */
export interface ThemeContextData {

	/** Helper method to change current theme. */
	changeTheme: (slug: string) => void,

	/** Current theme */
	theme: Theme
}

/**
 * This is the context where BlueBase theme is stored.
 */
export const ThemeContext: React.Context<ThemeContextData> = createContext(undefined as any);

/**
 * BlueBase theme consumer.
 */
export const ThemeConsumer = ThemeContext.Consumer;

/**
 * 🎨 ThemeProvider
 */
export class ThemeProvider extends React.Component<ThemeProviderProps, ThemeProviderState> {

	static contextType = BlueBaseContext;

	readonly state: ThemeProviderState = {
		loading: true,
	};

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
	async setTheme(slug: string | undefined, overrides: ThemeValueInput = {}, BB: BlueBase) {

		if (this.state.loading !== true) {
			this.setState({ loading: true });
		}

		const key = slug || BB.Configs.getValue('theme.name');

		const theme = await BB.Themes.resolve(key);

		if (!theme) {
			this.setState({
				error: Error(`Could not change theme. Reason: Theme with the key "${key}" does not exist.`),
				loading: false,
			});
			return;
		}

		this.setState({ theme: deepmerge(theme, overrides) as Theme, loading: false });
	}

	render() {

		const BB: BlueBase = (this as any).context;
		const { loading, error, theme } = this.state;

		const retry = () => this.setTheme(this.props.theme, this.props.overrides, BB);

		if (error) {
			return <BB.Components.ErrorState error={error} retry={retry} />;
		}

		if (loading) {
			return <BB.Components.LoadingState retry={retry} />;
		}

		if (!theme) {
			return <BB.Components.ErrorState error={Error('Error: Could not load theme.')} />;
		}

		const value: ThemeContextData = {
			changeTheme: (slug: string) => { BB.Configs.setValue('theme.name', slug); },
			theme
		};

		return (
      <ThemeContext.Provider value={value} children={this.props.children} />
		);
	}
}
