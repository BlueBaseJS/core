import { Configs } from '../Configs';
import { createContext } from 'react';

export type IntlMessages = {
	[key: string]: string;
};

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
export const IntlConsumer: React.Consumer<IntlContextData> = IntlContext.Consumer;
