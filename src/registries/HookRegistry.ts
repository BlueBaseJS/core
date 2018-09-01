import { BlueRain } from '../BlueRain';
import { Registry } from './Registry';
import isNil from 'lodash.isnil';

export type HookHandlerFn<T = any> = (value: T, args: { [key: string]: any }, BR: BlueRain) => T | Promise<T>;

export interface HookListener {
	name: string,
	priority: number,
	handler: HookHandlerFn,
}

export const DEFAULT_PRIORITY = 10;

export class HookRegistry extends Registry<HookListener[]> {

	/**
	 * Add a hook listener. If the hook listener already exists, it will throw and Error.
	 * @param hookName Name to the hook to subscribe to
	 * @param listenerName Name of the lister or the source of the listener
	 * @param listener Listener function
	 * @param index Position to insert this hook at
	 */
	public register(hookName: string, listenerName: string, handler: HookHandlerFn, priority?: number) {

		const item: HookListener = {
			handler,
			name: listenerName,
			priority: !isNil(priority) ? priority : DEFAULT_PRIORITY,
		};

		const hookItems = this.get(hookName) || [];

		// If there are no items of this hookName yet,
		// Initialize new array
		if (hookItems.length === 0) {
			this.set(hookName, [item]);
			return;
		}

		// Check if listener already exists
		const found = hookItems.find(lookupItem => lookupItem.name === listenerName);
		if (!isNil(found)) {
			throw new Error(`Hook Listener "${listenerName}" already exists in "${hookName}" hook.`);
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
	 * TODO: document migration, each hook now gets 3 fixed args
	 * TODO: run now returns a promise, not value
	 * TODO: add, remove method replaced by register, unregister
	 * TODO: set and remove work differently
	 * TODO: there are no filters or events
	 * TODO: test and add example of running parallel hooks
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

			// Execute hook function
			const result = await hookItem.handler(hookValue, { ...args } , this.BR);

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