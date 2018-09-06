import { BlueRain } from '../BlueRain';
import { Registry } from './Registry';
import isNil from 'lodash.isnil';
import { BlueRainModule } from '../utils/BlueRainModule';

export type HookHandlerFn<T = any> = (value: T, args: { [key: string]: any }, BR: BlueRain) => T | Promise<T>;

export interface HookListener {
	name: string,
	priority: number,
	handler: BlueRainModule<HookHandlerFn>,
}

function instanceOfHookListener(object: any): object is HookListener {
	return 'handler' in object;
}

export const DEFAULT_PRIORITY = 10;

export class HookRegistry extends Registry<HookListener[]> {

	/**
	 * Add a hook listener. If the hook listener already exists, it will throw and Error.
	 *
	 * - If whole listener is a BlueRainModule, it is resolved immidiately
	 * - If the handler function is a BlueRainModule, it will be resolve at run time
	 *
	 * TODO: Add array support
	 * 
	 * @param hookName Name to the hook to subscribe to
	 * @param listenerName Name of the lister or the source of the listener
	 * @param listener Listener function
	 * @param index Position to insert this hook at
	 */
	public async register(hookName: string, listener: HookListener | BlueRainModule<HookListener>) {

		// If the listener is not a BlueRain module, covert it into one
		if (!(listener instanceof BlueRainModule)) {
			listener = new BlueRainModule(listener);
		}

		// Resolve listener
		listener = await listener.promise;

		// Add defaults
		const item: HookListener = {
			priority: DEFAULT_PRIORITY,
			...listener,
		};

		const hookItems = this.get(hookName) || [];

		// If there are no items of this hookName yet,
		// Initialize new array
		if (hookItems.length === 0) {
			this.set(hookName, []);
			return;
		}

		// Check if listener already exists
		const found = hookItems.find(lookupItem => lookupItem.name === listener.name);
		if (!isNil(found)) {
			throw new Error(`Hook Listener "${listener.name}" already exists in "${hookName}" hook.`);
		}

		this.set(hookName, [...hookItems, item]);
	}

	/**
	 * Remove a hook listener.
	 * @param hookName Name to the hook to subscribe to
	 * @param listenerName Name of the lister or the source of the listener
	 */
	public unregister(hookName: string, listenerName: string) {

		if (!this.has(hookName)) {
			throw Error(`${hookName} hook does not exist.`);
		}

		const list = this.get(hookName) || [];
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

			// Execute hook function
			const result = await handler(hookValue, { ...args } , this.BR);

			// If the hook didn't return any value, return previous accumulator
			if (typeof result === 'undefined' && typeof initialValue !== 'undefined') {

				// if result of current iteration is undefined, don't pass it on
				this.BR.Logger.warn(
					`Hook Listener "${hookItem.name}" in hook "${hookName}" did not return a result.`,
					hookItem
				);
				return hookValue;
			}

			return result;

		}, Promise.resolve(initialValue));

		return res;
	}
}