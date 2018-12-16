import {
	BlueBaseModuleRegistry,
	BlueBaseModuleRegistryInputItem,
	BlueBaseModuleRegistryItem,
} from './BlueBaseModuleRegistry';
import {
	MaybeArray,
	MaybeBlueBaseModule,
	MaybeThunk,
	Omit,
	getDefiniteArray,
	getDefiniteBlueBaseModule,
	resolveThunk,
} from '../utils';
import { BlueBase } from '../BlueBase';
import { ItemCollection } from './Registry';
import isFunction from 'lodash.isfunction';
import isNil from 'lodash.isnil';

/**
 * Default priority for a hook
 */
export const DEFAULT_HOOK_PRIORITY = 10;

/**
 * The handler function of a hook object. This is the function that is
 * called for each hook, during execution.
 *
 * This may or may not be an async function.
 *
 * @param value The input value
 * @param args Any arguments passed on to the listener by the caller
 * @param BB The BlueBase context
 *
 * @returns Orinal or mutates version of input value. May be a promise that resolves the value.
 */
export type HookHandlerFn<T = any> = (value: T, args: { [key: string]: any }, BB: BlueBase) => T | Promise<T>;

export interface HookRegistryItemExtras {
	/**
	 * Priority of exeuction.
	 *
	 * @default 10
	 */
	priority: number;

	/**
	 * ID of event to subscribe to
	 */
	event: string;

	[key: string]: any,
}

export type HookRegistryItem = BlueBaseModuleRegistryItem<HookHandlerFn> & HookRegistryItemExtras;
export interface HookRegistryInputItem extends BlueBaseModuleRegistryInputItem<HookHandlerFn> {

	/**
	 * ID of event to subscribe to
	 */
	event: string;
}

type ItemType = HookRegistryItem;
type ItemInputType = HookRegistryInputItem;

export type Hook = HookRegistryItemExtras & { value: HookHandlerFn };
export type HookInput = HookRegistryInputItem;

export type HookInputCollection = ItemCollection<HookInput>;


///////// Nested Collection

export type HookInputNestedCollection<T = Omit<HookInput, 'event'> | HookHandlerFn>
 = MaybeThunk<{ [event: string]: MaybeArray<MaybeBlueBaseModule<T>> }>;


/**
 * 🎣 HookRegistry
 */
export class HookRegistry extends BlueBaseModuleRegistry<ItemType, ItemInputType> {

	public async registerNestedCollection(collections: HookInputNestedCollection = {}) {

		// If hooks field is a thunk, then call the thunk function
		collections = resolveThunk(collections, this.BB);

		// Extract hook names. These are events that are being subscribed to
		const eventNames = Object.keys(collections);

		// Iterate over each hook name
		for (const eventName of eventNames) {

			// Extract collection for each event
			const singleCollection = getDefiniteArray(collections[eventName]);

			for (let item of singleCollection) {

				// Make sure item is resolved if its a promise
				item = await getDefiniteBlueBaseModule(item);

				// Register each item indivitually
				if (this.isInputValue(item)) {
					await this.register({ event: eventName, value: item });
					continue;
				}

				const newItem: HookRegistryInputItem = { event: eventName, ...item } as any;

				if (!this.isInputItem(newItem)){
					throw Error(`Could not register Hook. Reason: Input is not a hook item.`);
				}

				await this.register(newItem);
			}

		}
	}

	/**
	 * Get all hooks for a specific event
	 * @param event
	 */
	public findAllByEvent(event: string) {
		return this.filter((_value, _key, item) => item.event === event);
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

		let value = initialValue;

		// Get all hook items registered for this event
		const hookItems = Object.values(this.findAllByEvent(eventName));

		// If there are no hook items registered for this hook
		if (hookItems.length === 0) {
			return value;
		}

		// Sort items based on priority
		hookItems.sort((a, b) => a.priority - b.priority);

		// Run waterfall
		for (const item of hookItems) {

			// Resolve handler functions
			const handler = await item.value;

			// Check if handler is a valid function
			if (!isFunction(handler)) {
				throw Error(`Handler of HookListener "${item.key}" in hook "${eventName}" is not a function.`);
			}

			// Execute hook function
			const result = await handler(value, { ...args }, this.BB);

			// If the hook didn't return any value, return previous accumulator
			if (typeof result === 'undefined' && typeof initialValue !== 'undefined') {

				// if result of current iteration is undefined, don't pass it on
				this.BB.Logger.warn(`HookListener "${item.key}" in hook "${eventName}" did not return a result.`, item);
			} else {
				value = result;
			}

		}

		return value;
	}

	/**
	 * Typeguard to check a given object is an input value
	 * @param value
	 */
	protected isInputValue(value: any): value is ItemInputType['value'] {
		return typeof value === 'function';
	}

	/**
	 * Typeguard to check a given object is a input item
	 * @param item
	 */
	protected isInputItem(item: any): item is ItemInputType {
		return !isNil(item.value) && !isNil(item.event);
	}

	protected createItem(key: string, partial: any): HookRegistryItem {

		return super.createItem(key, {
			priority: DEFAULT_HOOK_PRIORITY,
			...partial,
		});
	}

}