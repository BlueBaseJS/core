import { ErrorState, LoadingState } from '../getComponent';
import React, { createContext } from 'react';
import { BlueBase } from '../BlueBase';
import { BlueBaseContext } from '../Context';

export type IntlMessages = {
	[key: string]: string;
};

/**
 * Props of the `IntlProvider` component.
 */
export interface IntlProviderProps {
	children: React.ReactNode,
}

export interface IntlProviderState {
	readonly locale: string;
	readonly loading: boolean,
	readonly messages: IntlMessages,
	readonly error?: any,
}

/**
 * Interface of object passed as param to the IntlConsumer render prop method.
 */
export interface IntlContextData {

	changeLocale: (slug: string) => void,

	locale: string;

	messages: IntlMessages
}

/**
 * This is the context where BlueBase theme is stored.
 */
export const IntlContext: React.Context<IntlContextData> = createContext(undefined as any);

/**
 * BlueBase theme consumer.
 */
export const IntlConsumer = IntlContext.Consumer;

/**
 * 🈯️ IntlProvider
 */
export class IntlProvider extends React.Component<IntlProviderProps, IntlProviderState> {

	static contextType = BlueBaseContext;

	readonly state: IntlProviderState = {
		loading: true,
		locale: 'en',
		messages: {},
	};

	/** Stores configuration subscription ID */
	private subscriptionId?: string;

	async componentWillMount() {
		const BB: BlueBase = (this as any).context;

		const locale = BB.Configs.getValue('locale');
		this.setLocale(locale, BB);

		// Subscribe to theme config updates
		this.unsubscribe(BB);
		this.subscribe(BB);
	}

	componentWillUnmount() {
		const BB: BlueBase = (this as any).context;

		// Unsubscribe from theme config updates
		this.unsubscribe(BB);
	}

	/**
	 * Sets a theme to Provider's state. If a theme key is given, it is used,
	 * otherwise global theme is used.
	 *
	 * @param slug
	 * @param BB
	 */
	async setLocale(locale: string, BB: BlueBase) {

		if (this.state.loading !== true) {
			this.setState({ loading: true });
		}

		// Example: "bluebase.intl.messages.en", "bluebase.intl.messages.ur"
		const filterName = `bluebase.intl.messages.${locale}`;

		try {
			const messages = await BB.Filters.run(filterName, {});
			this.setState({ messages, loading: false, locale });
		} catch (error) {
			this.setState({
				error,
				loading: false,
			});
		}
	}

	render() {

		const BB: BlueBase = (this as any).context;
		const { error, loading, locale, messages } = this.state;

		const retry = () => this.setLocale(locale, BB);

		if (error) {
			return <ErrorState error={error} retry={retry} />;
		}

		if (loading) {
			return <LoadingState retry={retry} />;
		}

		const value: IntlContextData = {
			changeLocale: (newLocale: string) => { BB.Configs.setValue('locale', newLocale); },
			locale,
			messages
		};

		return (
      <IntlContext.Provider value={value} children={this.props.children} />
		);
	}

	/**
	 * Subscribe to locale config updates
	 * @param BB
	 */
	private subscribe(BB: BlueBase) {
		this.subscriptionId = BB.Configs.subscribe('locale', (value) => {
			this.setLocale(value, BB);
		});
	}

	/**
	 * Unsubscribe from locale config updates
	 * @param BB
	 */
	private unsubscribe(BB: BlueBase) {
		if(this.subscriptionId) {
			BB.Configs.unsubscribe('locale', this.subscriptionId);
			delete this.subscriptionId;
		}
	}
}
