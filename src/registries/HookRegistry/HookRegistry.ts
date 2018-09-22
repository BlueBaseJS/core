import * as TYPES from './types';
import { parseHookCollectionItem } from './helpers';
import { MaybeBlueRainModuleOrInput, getDefiniteBlueRainModule } from '../../api/BlueRainModule';
import { Registry } from '../Registry';
import isFunction from 'lodash.isfunction';
import isNil from 'lodash.isnil';
import { Hook } from '../../models/Hook';

/**
 * Stores all Hooks in BlueRain
 */
export class HookRegistry extends Registry<Hook[]> {

	/**
	 * Add a hook listener. If the hook listener already exists, it will throw and Error.
	 *
	 * - If whole listener is a BlueRainModule, it is resolved immidiately
	 * - If the handler function is a BlueRainModule, it will be resolve at run time
	 *
	 * @param eventName Name to the hook to subscribe to
	 * @param listener Listener object
	 */
	public async register(eventName: string, listener: MaybeBlueRainModuleOrInput<TYPES.HookInput>) {

		// const item = await this.buildHookListenerInternal(listener);
		const input = await getDefiniteBlueRainModule(listener).promise;
		const item = new Hook(input);

		const hookItems = this.get(eventName) || [];

		// If there are no items of this hookName yet,
		// Initialize new array
		if (hookItems.length === 0) {
			this.set(eventName, [item]);
			return;
		}

		// Check if listener already exists
		const found = hookItems.find(lookupItem => lookupItem.name === item.name);
		if (!isNil(found)) {
			throw new Error(`Could not register hook. Reason: "${item.name}" hook item already exists in "${eventName}" hook.`);
		}

		this.set(eventName, [...hookItems, item]);
	}

	public async registerCollection(collection: TYPES.HookCollection, nameGenerator?: TYPES.ListenerNameGeneratorFn) {

		// Extract hook names. These are events that are being subscribed to
		const eventNames = Object.keys(collection);

		// Iterate over each hook name
		for (const eventName of eventNames) {

			const collectionItem = collection[eventName];
			const hookArr = await parseHookCollectionItem(collectionItem, eventName, nameGenerator);

			for (const hook of hookArr) {

				// Register this listener
				await this.BR.Hooks.register(eventName, hook);
			}
		}
	}

	/**
	 * Remove a hook listener.
	 * @param eventName Name to the hook to subscribe to
	 * @param listenerName Name of the lister or the source of the listener
	 */
	public unregister(eventName: string, listenerName: string) {

		const list = this.get(eventName);

		if (!this.has(eventName) || !list) {
			throw Error(`${eventName} hook does not exist.`);
		}

		const index = list.findIndex(item => !!(item && item.name === listenerName));

		if (index === -1) {
			throw Error(`${listenerName} listener is not added in ${eventName} hook.`);
		}

		list.splice(index, 1);
		this.set(eventName, list);
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
	 * @param eventName Name of the hook
	 * @param value Initial value to send to the hook
	 * @param args Any extra arguments to pass to the hook
	 */
	public async run<T = any>(eventName: string, initialValue: T, args: { [key: string]: any } = {}): Promise<T> {

		// Get all hook items registered for hookName
		const hookItems = this.data.get(eventName) || [];

		// If there are no hook items registered for this hook
		if (isNil(hookItems) || hookItems.length === 0) {
			return initialValue;
		}

		hookItems.sort((a, b) => a.priority - b.priority);

		// Run waterfall
		const res = await hookItems.reduce(this.runHandler(eventName, initialValue, args), Promise.resolve(initialValue));

		return res;
	}

	/**
	 * Internal function used by 'run' method.
	 * Executes a single hook.
	 */
	private runHandler =
	<T = any>(eventName: string, initialValue: T, args: { [key: string]: any } = {}) =>
	async (accumulator: any, hookItem: Hook) => {

		// Resolve value before sending forward
		const hookValue = await accumulator;

		// Handler
		const handler: TYPES.HookHandlerFn<T> = await hookItem.handler.promise;

		if (!isFunction(handler)) {
			throw Error(`Handler of HookListener "${hookItem.name}" in hook "${eventName}" is not a function.`);
		}

		// Execute hook function
		const result = await handler(hookValue, { ...args }, this.BR);

		// If the hook didn't return any value, return previous accumulator
		if (typeof result === 'undefined' && typeof initialValue !== 'undefined') {

			// if result of current iteration is undefined, don't pass it on
			this.BR.Logger.warn(
				`HookListener "${hookItem.name}" in hook "${eventName}" did not return a result.`,
				hookItem
			);
			return hookValue;
		}

		return result;
	}

}
