import React, { createContext } from 'react';
import { useFilter, useRtl } from '../hooks';

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
	const [locale, setLocale] = useLocale();
	const { rtl, direction, setDirection } = useRtl();

	// Example: "bluebase.intl.messages.en", "bluebase.intl.messages.ur"
	const { value: messages } = useFilter<IntlMessages>(`bluebase.intl.messages.${locale}`, {});

	const __ = (message: string) => (messages[message] ? messages[message] : message);

	const value: IntlContextData = {
		__,
		changeDirection: setDirection,
		changeLocale: setLocale,
		direction,
		locale,
		messages,
		rtl,
	};

	return <IntlContext.Provider value={value} children={props.children} />;
};

IntlProvider.displayName = 'IntlProvider';
