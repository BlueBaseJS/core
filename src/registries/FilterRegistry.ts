import isFunction from 'lodash.isfunction';
import isNil from 'lodash.isnil';

import { BlueBase } from '../BlueBase';
import {
	BlueBaseModule,
	getDefiniteArray,
	getDefiniteBlueBaseModule,
	MaybeArray,
	MaybeBlueBaseModule,
	MaybeThunk,
	Omit,
	resolveThunk,
} from '../utils';
import {
	BlueBaseModuleRegistry,
	BlueBaseModuleRegistryInputItem,
	BlueBaseModuleRegistryItem,
} from './BlueBaseModuleRegistry';
import { ItemCollection } from './Registry';

/**
 * Default priority for a filter.
 */
export const DEFAULT_HOOK_PRIORITY = 10;

/**
 * The handler function of a filter object. This is the function that is
 * called for each filter, during execution.
 *
 * This may or may not be an async function.
 *
 * @param value The input value
 * @param args Any arguments passed on to the listener by the caller
 * @param BB The BlueBase context
 *
 * @returns Original or mutated version of input value. May be a promise that resolves the value.
 */
export type FilterHandlerFn<T = any> = (
	value: T,
	args: { [key: string]: any },
	BB: BlueBase
) => T | Promise<T>;

/**
 * Properties of a Filter item.
 */
export interface FilterRegistryItemProps {
	[key: string]: any;

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
}

export type FilterRegistryItem = BlueBaseModuleRegistryItem<FilterHandlerFn> &
	FilterRegistryItemProps;
export interface FilterRegistryInputItem extends BlueBaseModuleRegistryInputItem<FilterHandlerFn> {
	/**
	 * ID of event to subscribe to
	 */
	event: string;
}

type ItemType = FilterRegistryItem;
type ItemInputType = FilterRegistryInputItem;

/**
 * Filter Type.
 */
export type Filter = FilterRegistryItemProps & { value: FilterHandlerFn };

/**
 * FilterInput.
 */
export type FilterInput = FilterRegistryInputItem;

export type FilterInputCollection = ItemCollection<FilterInput>;

/**
 * A nested filter collection.
 */
export type FilterNestedCollection<T = Omit<FilterInput, 'event'> | FilterHandlerFn> = MaybeThunk<{
	[event: string]: MaybeArray<MaybeBlueBaseModule<T>>;
}>;

/**
 * 🚇 FilterRegistry
 */
export class FilterRegistry extends BlueBaseModuleRegistry<ItemType, ItemInputType> {
	/**
	 * Registers a nested filter collection.
	 *
	 * @param collections
	 */
	public async registerNestedCollection(collections: FilterNestedCollection = {}) {
		// If filters field is a thunk, then call the thunk function
		collections = resolveThunk(collections, this.BB);

		// Extract filter names. These are events that are being subscribed to
		const eventNames = Object.keys(collections);

		// Iterate over each filter name
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

				const newItem: FilterRegistryInputItem = { event: eventName, ...item } as any;

				if (!this.isInputItem(newItem)) {
					throw Error('Could not register Filter. Reason: Input is not a filter item.');
				}

				await this.register(newItem);
			}
		}
	}

	/**
	 * Get all filters for a specific event
	 * @param event
	 */
	public findAllByEvent(event: string) {
		return this.filter(
			(_value: BlueBaseModule<FilterHandlerFn<any>>, _key: string, item: FilterRegistryItem) =>
				item.event === event
		);
	}

	/**
	 * Run all filter listeners in a waterfall.
	 * Each listener function gets 3 arguments:
	 * 	- value
	 * 	- args
	 * 	- context
	 *
	 * Each listener function is expected to return a value.
	 *
	 * Example Usage: BB.Filters.run('filter-name', val, args);
	 *
	 * @param eventName Name of the filter
	 * @param value Initial value to send to the filter
	 * @param args Any extra arguments to pass to the filter
	 */
	public async run<T = any>(
		eventName: string,
		initialValue: T,
		args: { [key: string]: any } = {}
	): Promise<T> {
		let value = initialValue;

		// Get all filter items registered for this event
		const filterItems = Object.values(this.findAllByEvent(eventName));

		// If there are no filter items registered for this filter
		if (filterItems.length === 0) {
			return value;
		}

		// Sort items based on priority
		filterItems.sort((a: FilterRegistryItem, b: FilterRegistryItem) => a.priority - b.priority);

		// Run waterfall
		for (const item of filterItems) {
			// Resolve handler functions
			const handler = await item.value;

			// Check if handler is a valid function
			if (!isFunction(handler)) {
				throw Error(
					`Handler of FilterListener "${item.key}" in filter "${eventName}" is not a function.`
				);
			}

			// Execute filter function
			const result = await handler(value, { ...args }, this.BB);

			// If the filter didn't return any value, return previous accumulator
			if (typeof result === 'undefined' && typeof initialValue !== 'undefined') {
				// if result of current iteration is undefined, don't pass it on
				this.BB.Logger.warn(
					`FilterListener "${item.key}" in filter "${eventName}" did not return a result.`,
					item
				);
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

	/**
	 * Convert any input value to an item. This is where you transform inputs and add defualts
	 * @param key
	 * @param partial
	 */
	protected createItem(key: string, partial: any): FilterRegistryItem {
		return super.createItem(key, {
			priority: DEFAULT_HOOK_PRIORITY,
			...partial,
		});
	}
}
