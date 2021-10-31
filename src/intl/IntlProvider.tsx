import React from 'react';

import { Configs } from '../Configs';
import { IntlContext, IntlContextData, IntlMessages } from '../contexts';
import { useFilter, useRtl } from '../hooks';
import { useLocale } from '../hooks/useLocale';

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

	return <IntlContext.Provider value={value}>{props.children}</IntlContext.Provider>;
};

IntlProvider.displayName = 'IntlProvider';
