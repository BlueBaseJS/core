import { MaybeEsModule, MaybePromise } from '../../utils';
import { BlueRain } from '../../BlueRain';
import { BlueRainModule } from '../../api/BlueRainModule';
import { Registry } from '../Registry';
import isFunction from 'lodash.isfunction';
import isNil from 'lodash.isnil';

export type HookHandlerFn<T = any> = (value: T, args: { [key: string]: any }, BR: BlueRain) => T | Promise<T>;

/**
 * HookListener interface
 */
export interface HookListener {
	/** Name of the listener, used as an ID */
	name: string,

	/** Priority of exeuction */
	priority?: number,

	/** Handler function */
	handler: MaybePromise<MaybeEsModule<HookHandlerFn>> | BlueRainModule<HookHandlerFn>,
}

/**
 * Format of the HookListener that is saved in the Registry after convertion
 */
export interface HookListenerInternal extends HookListener {
	priority: number,
	handler: BlueRainModule<HookHandlerFn>,
}

/**
 * Type guard to check if an object is a HookListener
 * @param item
 */
export function isHookListener(item: HookListener | BlueRainModule<HookListener>): item is HookListener {
	return (item as HookListener).handler !== undefined;
}

export const DEFAULT_PRIORITY = 10;

/**
 * Stores all Hooks in BlueRain
 */
export class HookRegistry extends Registry<HookListenerInternal[]> {

	/**
	 * Add a hook listener. If the hook listener already exists, it will throw and Error.
	 *
	 * - If whole listener is a BlueRainModule, it is resolved immidiately
	 * - If the handler function is a BlueRainModule, it will be resolve at run time
	 *
	 * @param hookName Name to the hook to subscribe to
	 * @param listener Listener object
	 */
	// TODO: Add BlueRainModuleInput<HookListener> support to params
	public async register(hookName: string, listener: HookListener | BlueRainModule<HookListener>) {

		const item = await this.buildHookListenerInternal(listener);

		const hookItems = this.get(hookName) || [];

		// If there are no items of this hookName yet,
		// Initialize new array
		if (hookItems.length === 0) {
			this.set(hookName, [item]);
			return;
		}

		// Check if listener already exists
		const found = hookItems.find(lookupItem => lookupItem.name === item.name);
		if (!isNil(found)) {
			throw new Error(`Hook Listener "${item.name}" already exists in "${hookName}" hook.`);
		}

		this.set(hookName, [...hookItems, item]);
	}

	/**
	 * Remove a hook listener.
	 * @param hookName Name to the hook to subscribe to
	 * @param listenerName Name of the lister or the source of the listener
	 */
	public unregister(hookName: string, listenerName: string) {

		const list = this.get(hookName);

		if (!this.has(hookName) || !list) {
			throw Error(`${hookName} hook does not exist.`);
		}

		const index = list.findIndex(item => !!(item && item.name === listenerName));

		if (index === -1) {
			throw Error(`${listenerName} listener is not added in ${hookName} hook.`);
		}

		list.splice(index, 1);
		this.set(hookName, list);
	}

	/**
	 * Run all hook listeners in a waterfall.
	 * Each listener function gets 3 arguments:
	 * 	- value
	 * 	- args
	 * 	- context
	 *
	 * Each listener function is expected to return a value.
	 *
	 * Example Usage: BR.Hooks.run('hook-name', val, args);
	 *
	 * @param hookName Name of the hook
	 * @param value Initial value to send to the hook
	 * @param args Any extra arguments to pass to the hook
	 */
	public async run<T = any>(hookName: string, initialValue: T, args: { [key: string]: any } = {}): Promise<T> {

		// Get all hook items registered for hookName
		const hookItems = this.data.get(hookName) || [];

		// If there are no hook items registered for this hook
		if (isNil(hookItems) || hookItems.length === 0) {
			return initialValue;
		}

		hookItems.sort((a, b) => a.priority - b.priority);

		// Run waterfall
		const res = await hookItems.reduce(async (accumulator: any, hookItem) => {

			// Resolve value before sending forward
			const hookValue = await accumulator;

			// Handler
			const handler: HookHandlerFn<T> = await hookItem.handler.promise;

			if (!isFunction(handler)) {
				throw Error(`Handler of HookListener "${hookItem.name}" in hook "${hookName}" is not a function.`);
			}

			// Execute hook function
			const result = await handler(hookValue, { ...args } , this.BR);

			// If the hook didn't return any value, return previous accumulator
			if (typeof result === 'undefined' && typeof initialValue !== 'undefined') {

				// if result of current iteration is undefined, don't pass it on
				this.BR.Logger.warn(
					`HookListener "${hookItem.name}" in hook "${hookName}" did not return a result.`,
					hookItem
				);
				return hookValue;
			}

			return result;

		}, Promise.resolve(initialValue));

		return res;
	}

	/**
	 * Convert a HookListener object to HookListenerInternal object
	 * @param listener
	 */
	private async buildHookListenerInternal
		(listener: HookListener | BlueRainModule<HookListener>): Promise<HookListenerInternal> {

		// If the listener is not a BlueRain module, covert it into one
		if (isHookListener(listener)) {
			listener = new BlueRainModule(listener);
		}

		// Resolve listener
		listener = await listener.promise;

		let handler = listener.handler;

		// Is handler an imported module?
		if (!(handler instanceof BlueRainModule)) {
			handler = new BlueRainModule(handler);
		}

		// Add defaults
		const item: HookListenerInternal = {
			priority: DEFAULT_PRIORITY,
			...listener,
			handler,
		};

		return item;
	}

}