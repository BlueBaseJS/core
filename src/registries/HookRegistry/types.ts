import { MaybeArray } from '../../utils';
import { BlueRain } from '../../BlueRain';
import { MaybeBlueRainModuleOrInput } from '../../api/BlueRainModule';
import { Hook } from '../../models/Hook';

/**
 * This function is used to dynamically generate listener name, if one is not
 * provided during registeration.
 *
 * @param eventInput Name of hook that is being subscribed to
 * @param index The index of the listener, if an array of listeners is being registered. Otherwise it's 0.
 */
export type ListenerNameGeneratorFn = (eventInput: string, index: number) => string;

/**
 * The handler function of a hook listener. This is the function that is
 * called for each listener, during hook execution.
 *
 * This may or may not be an async function.
 *
 * @param value The input value
 * @param args Any arguments passed on to the listener by the caller
 * @param BR The BlueRain context
 *
 * @returns Orinal or mutates version of input value. May be a promise that resolves the value.
 */
export type HookHandlerFn<T = any> = (value: T, args: { [key: string]: any }, BR: BlueRain) => T | Promise<T>;

export type HookInputOrHandler = Hook | HookInput | HookHandlerFn;


export interface HookInput {
	/** Name of the listener, used as an ID */
	name: string,

	/**
	 * Priority of exeuction.
	 *
	 * @default 10
	 */
	priority?: number,

	/** Handler function */
	handler: MaybeBlueRainModuleOrInput<HookHandlerFn>,
}


export type HookCollectionItem = MaybeArray<MaybeBlueRainModuleOrInput<HookInputOrHandler>>;

export type HookCollection = {
	[eventName: string]: HookCollectionItem
};
