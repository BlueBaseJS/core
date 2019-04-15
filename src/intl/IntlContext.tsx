import { BlueBaseDefaultConfigs, Configs } from '../Configs';
import { ErrorState, LoadingState } from '../getComponent';
import React, { createContext } from 'react';
import { BlueBase } from '../BlueBase';
import { BlueBaseContext } from '../Context';
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
	readonly rtl: boolean;
	readonly locale: string;
	readonly loading: boolean,
	readonly messages: IntlMessages,
	readonly error?: any,
}

/**
 * Interface of object passed as param to the IntlConsumer render prop method.
 */
export interface IntlContextData {
	__: (message: string) => string;
	changeLocale: (slug: string) => void,
	changeDirection: (direction: Configs['direction']) => void,
	direction: Configs['direction'];
	locale: string;
	messages: IntlMessages
	rtl: boolean;
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
		direction: BlueBaseDefaultConfigs.direction,
		loading: true,
		locale: BlueBaseDefaultConfigs.locale,
		messages: {},
		rtl: false, // We set this in componentWillMount (setDirection)
	};

	/** Stores configuration subscription ID */
	private localeSubscriptionId?: string;
	private directionSubscriptionId?: string;

	constructor(props: IntlProviderProps) {
		super(props);

    // This binding is necessary to make `this` work in the callback
		this.__ = this.__.bind(this);
	}

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

		// Decide if layout should be RTL or not
		let shouldBeRtl = false;

		if (direction === 'ltr') {
			shouldBeRtl = false;
		}
		else if (direction === 'rtl') {
			shouldBeRtl = true;
		}
		else if (direction === 'auto') {
			shouldBeRtl = !!rtlDetect.isRtlLang(this.state.locale);
		}

		// Everything is it should be, so do nothing
		if (shouldBeRtl === this.state.rtl && direction === this.state.direction) {
			return;
		}

		// Update layout
		I18nManager.forceRTL(shouldBeRtl);

		// Update state
		this.setState({ direction, rtl: shouldBeRtl });
	}

	__(message: string) {

		// We do this to keep a list off all messages in the app
		if (!this.state.messages[message]) {
			this.state.messages[message] = message;
		}

		return this.state.messages[message];
	}
	render() {

		const BB: BlueBase = (this as any).context;
		const { direction, error, loading, locale, messages, rtl } = this.state;

		const retry = () => this.setLocale(locale, BB);

		if (error) {
			return <ErrorState error={error} retry={retry} />;
		}

		if (loading) {
			return <LoadingState retry={retry} />;
		}

		const value: IntlContextData = {
			__: this.__,
			changeDirection: (dir: Configs['direction']) => { BB.Configs.setValue('direction', dir); },
			changeLocale: (newLocale: string) => { BB.Configs.setValue('locale', newLocale); },
			direction,
			locale,
			messages,
			rtl,
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
