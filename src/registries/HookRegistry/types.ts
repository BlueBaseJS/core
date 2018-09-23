import { MaybeArray } from '../../utils';
import { BlueRain } from '../../BlueRain';
import { MaybeBlueRainModuleOrInput } from '../../api/BlueRainModule';
import { Hook } from '../../models/Hook';
import { MaybeThunk } from '../../utils/Thunk';

/**
 * This function is used to dynamically generate hook name, if one is not
 * provided during registeration.
 *
 * @param eventInput Name of hook that is being subscribed to
 * @param index The index of the hook, if an array of listeners is being registered. Otherwise it's 0.
 */
export type HookNameGeneratorFn = (eventInput: string, index: number) => string;

/**
 * The handler function of a hook object. This is the function that is
 * called for each hook, during execution.
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

/**
 * An object that may either be an instance of Hook class, a HookInput object or hook handler function.
 * This object maybe parsed to an intance of Hook class.
 */
export type HookInputOrHandler = Hook | HookInput | HookHandlerFn;

/**
 * A hook input object used to create an instance of Hook class. This object is passed to the constructor of Hook class.
 */
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

/**
 * HookCollectionItem represents a single hook or multiple hooks for a single event in a HookCollection.
 * Each hook may be a Hook, HookInput or a Hook handler function. These may also be BlueRain modules.
 */
export type HookCollectionItem = MaybeArray<MaybeBlueRainModuleOrInput<HookInputOrHandler>>;

/**
 * A Hook Collection is used to register multiple hooks for multiple events at the same time.
 */
export type HookCollection = {
	[eventName: string]: HookCollectionItem
};

/**
 * An object that maybe a HookCollection or a thunk that returns a HookCollection.
 */
export type HookCollectionInput = MaybeThunk<HookCollection>;
