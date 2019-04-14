import { ErrorState, LoadingState } from '../getComponent';
import React, { createContext } from 'react';
import { BlueBase } from '../BlueBase';
import { BlueBaseContext } from '../Context';
import { Configs } from '../Configs';
import { I18nManager } from 'react-native';
import rtlDetect from 'rtl-detect';

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
	readonly direction: Configs['direction'];
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
	changeDirection: (direction: Configs['direction']) => void,
	direction: Configs['direction'];
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
		direction: 'ltr',
		loading: true,
		locale: 'en',
		messages: {},
	};

	/** Stores configuration subscription ID */
	private localeSubscriptionId?: string;
	private directionSubscriptionId?: string;

	async componentWillMount() {
		const BB: BlueBase = (this as any).context;

		// Locale
		const locale = BB.Configs.getValue('locale');
		this.setLocale(locale, BB);

		// Subscribe to locale config updates
		this.unsubscribeLocale(BB);
		this.subscribeLocale(BB);

		// Content Direction
		this.setDirection(BB);
		this.unsubscribeDirection(BB);
		this.subscribeDirection(BB);

	}

	componentWillUnmount() {
		const BB: BlueBase = (this as any).context;

		this.unsubscribeLocale(BB);
		this.unsubscribeDirection(BB);
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
			this.setDirection(BB);
		} catch (error) {
			this.setState({
				error,
				loading: false,
			});
		}
	}

	/**
	 * Sets a theme to Provider's state. If a theme key is given, it is used,
	 * otherwise global theme is used.
	 *
	 * @param slug
	 * @param BB
	 */
	setDirection(BB: BlueBase) {

		const direction = BB.Configs.getValue('direction');

		if (direction === 'ltr') {
			I18nManager.forceRTL(false);
		}
		else if (direction === 'rtl') {
			I18nManager.forceRTL(true);
		}
		else if (direction === 'auto') {
			const rtl = rtlDetect.isRtlLang(this.state.locale);
			I18nManager.forceRTL(!!rtl);
		}

		this.setState({ direction });
	}

	render() {

		const BB: BlueBase = (this as any).context;
		const { direction, error, loading, locale, messages } = this.state;

		const retry = () => this.setLocale(locale, BB);

		if (error) {
			return <ErrorState error={error} retry={retry} />;
		}

		if (loading) {
			return <LoadingState retry={retry} />;
		}

		const value: IntlContextData = {
			changeDirection: (dir: Configs['direction']) => { BB.Configs.setValue('direction', dir); },
			changeLocale: (newLocale: string) => { BB.Configs.setValue('locale', newLocale); },
			direction,
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
	private subscribeLocale(BB: BlueBase) {
		this.localeSubscriptionId = BB.Configs.subscribe('locale', (value) => {
			this.setLocale(value, BB);
		});
	}

	/**
	 * Unsubscribe from locale config updates
	 * @param BB
	 */
	private unsubscribeLocale(BB: BlueBase) {
		if(this.localeSubscriptionId) {
			BB.Configs.unsubscribe('locale', this.localeSubscriptionId);
			delete this.localeSubscriptionId;
		}
	}

	/**
	 * Subscribe to direction config updates
	 * @param BB
	 */
	private subscribeDirection(BB: BlueBase) {
		this.directionSubscriptionId = BB.Configs.subscribe('direction', () => {
			this.setDirection(BB);
		});
	}

	/**
	 * Unsubscribe from direction config updates
	 * @param BB
	 */
	private unsubscribeDirection(BB: BlueBase) {
		if(this.directionSubscriptionId) {
			BB.Configs.unsubscribe('direction', this.directionSubscriptionId);
			delete this.directionSubscriptionId;
		}
	}
}
