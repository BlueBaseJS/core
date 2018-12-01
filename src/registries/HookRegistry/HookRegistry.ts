import * as TYPES from './types';
import { MaybeBlueBaseModuleOrInput, getDefiniteBlueBaseModule, makeId, resolveThunk } from '../../utils';
import { Hook } from '../../models/Hook';
import { Registry } from '../Registry';
import isFunction from 'lodash.isfunction';
import isNil from 'lodash.isnil';
import { parseHookCollectionItem } from './helpers';

/**
 * 🎣 HookRegistry
 *
 * This is where are BlueBase hooks are stored.
 */
export class HookRegistry extends Registry<Hook[]> {

	/**
	 * Add a hook. If the hook already exists, it will throw and Error.
	 *
	 * BlueBaseModule Resolution:
	 *
	 * - If the hook is a BlueBaseModule, it is resolved immidiately.
	 * - If the handler function is a BlueBaseModule, it will be resolve at run time
	 *
	 * @param eventName Name to the hook to subscribe to
	 * @param hook Hook object
	 */
	public async register(eventName: string, hook: MaybeBlueBaseModuleOrInput<TYPES.HookInput>) {

		// const item = await this.buildHookListenerInternal(listener);
		const input = await getDefiniteBlueBaseModule(hook).promise;

		// If the hook doesn't have a name, create a unique name
		if (!input.name) {
			input.name = this.createUniqueHookName(eventName);
		}

		// Create a new hook object
		const item = new Hook(input);

		const hookItems = this.get(eventName) || [];

		// If there are no items of this hookName yet,
		// Initialize new array
		if (hookItems.length === 0) {
			this.set(eventName, [item]);
			return item;
		}

		// Check if listener already exists
		if (this.hasHook(eventName, item.name)) {
			throw new Error(`Could not register hook. Reason: "${item.name}" hook item already exists in "${eventName}" hook.`);
		}

		this.set(eventName, [...hookItems, item]);

		return item;
	}

	/**
	 * Register a collection of hooks.
	 *
	 * @param collection HookCollection object
	 * @param nameGenerator A function that is used to generate hook name, when one is not given
	 */
	public async registerCollection(collection: TYPES.HookCollectionInput, nameGenerator?: TYPES.HookNameGeneratorFn) {

		// If hooks field is a thunk, then call the thunk function
		collection = resolveThunk(collection, this.BB);

		// Extract hook names. These are events that are being subscribed to
		const eventNames = Object.keys(collection);

		// Iterate over each hook name
		for (const eventName of eventNames) {

			const collectionItem = collection[eventName];
			const hookArr = await parseHookCollectionItem(collectionItem, eventName, nameGenerator);

			for (const hook of hookArr) {

				// Register this listener
				await this.BB.Hooks.register(eventName, hook);
			}
		}
	}

	/**
	 * Check if a hook event has a specific hook
	 * @param eventName Name of hook event
	 * @param hookName Hook name
	 */
	public hasHook(eventName: string, hookName: string) {
		const hookItems = this.get(eventName);

		if (!hookItems) {
			return false;
		}

		const found = hookItems.find(lookupItem => lookupItem.name === hookName);
		if (isNil(found)) {
			return false;
		}

		return true;
	}

	/**
	 * Create a unique hook name for a given event. Used to generate names for anonymous hooks
	 * @param eventName Event Name
	 */
	public createUniqueHookName(eventName: string) {
		while(true) {
			const name = `hook-${makeId()}`;

			if (!this.hasHook(eventName, name)) {
				return name;
			}
		}
	}

	/**
	 * Unregister a hook.
	 *
	 * @param eventName Name to the hook to subscribe to
	 * @param hookName Name of the lister or the source of the listener
	 */
	public unregister(eventName: string, hookName: string) {

		const list = this.get(eventName);

		if (!this.has(eventName) || !list) {
			throw Error(`${eventName} hook does not exist.`);
		}

		const index = list.findIndex(item => !!(item && item.name === hookName));

		if (index === -1) {
			throw Error(`${hookName} listener is not added in ${eventName} hook.`);
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
	 * Example Usage: BB.Hooks.run('hook-name', val, args);
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
		const result = await handler(hookValue, { ...args }, this.BB);

		// If the hook didn't return any value, return previous accumulator
		if (typeof result === 'undefined' && typeof initialValue !== 'undefined') {

			// if result of current iteration is undefined, don't pass it on
			this.BB.Logger.warn(
				`HookListener "${hookItem.name}" in hook "${eventName}" did not return a result.`,
				hookItem
			);
			return hookValue;
		}

		return result;
	}
}
