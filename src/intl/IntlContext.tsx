import { ErrorState, LoadingState, WaitObserver } from '../getComponent';
import React, { createContext, useContext } from 'react';
import { useFilter, useRtl } from '../hooks';

import { BlueBase } from '../BlueBase';
import { BlueBaseContext } from '../Context';
import { Configs } from '../Configs';
import { useLocale } from '../hooks/useLocale';

export type IntlMessages = {
	[key: string]: string;
};

/**
 * Props of the `IntlProvider` component.
 */
export interface IntlProviderProps {
	children: React.ReactNode;
}

export interface IntlProviderState {
	readonly direction: Configs['direction'];
	readonly rtl: boolean;
	readonly locale: string;
	readonly loading: boolean;
	readonly messages: IntlMessages;
	readonly error?: any;
}

/**
 * Interface of object passed as param to the IntlConsumer render prop method.
 */
export interface IntlContextData {
	__: (message: string) => string;
	changeLocale: (slug: string) => void;
	changeDirection: (direction: Configs['direction']) => void;
	direction: Configs['direction'];
	locale: string;
	messages: IntlMessages;
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
export const IntlProvider = (props: IntlProviderProps) => {
	const BB: BlueBase = useContext(BlueBaseContext);

	const [locale, setLocale] = useLocale();
	const { rtl, direction } = useRtl();

	// Example: "bluebase.intl.messages.en", "bluebase.intl.messages.ur"
	const { value: messages, loading, error } = useFilter<IntlMessages>(
		`bluebase.intl.messages.${locale}`,
		{}
	);

	const __ = (message: string) => (messages[message] ? messages[message] : message);
	const retry = () => setLocale(locale);

	if (error) {
		return <ErrorState error={error} retry={retry} />;
	}

	if (loading) {
		return (
			<WaitObserver>
				<LoadingState retry={retry} />
			</WaitObserver>
		);
	}

	const value: IntlContextData = {
		__,
		changeDirection: (dir: Configs['direction']) => {
			BB.Configs.setValue('direction', dir);
		},
		changeLocale: (newLocale: string) => {
			BB.Configs.setValue('locale', newLocale);
		},
		direction,
		locale,
		messages,
		rtl,
	};

	return <IntlContext.Provider value={value} children={props.children} />;
};
