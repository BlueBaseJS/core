import { HookCollectionItem, HookInput, HookNameGeneratorFn } from './types';
import { getDefiniteArray, getDefiniteBlueBaseModule } from '../../utils';
import { DEFAULT_HOOK_NAME_GENERATOR_FN } from './defaults';
import { Hook } from '../../models/Hook';
import isFunction from 'lodash.isfunction';

/**
 * Type guard to check if an object is a Hook
 * @param item
 */
export function isHook(item: any): item is Hook {
	return (item instanceof Hook);
}

/**
 * Type guard to check if an object is a HookInput
 * @param item
 */
export function isHookInput(item: any): item is HookInput {
	return item.handler !== undefined;
}

/**
 * Parses a single hook event of collection, and returns an array of hook objects.
 * @param collectionItem
 * @param eventName
 * @param plugin
 */
export async function parseHookCollectionItem(
	collectionItem: HookCollectionItem,
	eventName: string,
	nameGenerator: HookNameGeneratorFn = DEFAULT_HOOK_NAME_GENERATOR_FN
) {

	const hookArr: Hook[] = [];

	// Each hookField maybe an array, we create one if its not
	// We've done this to allow multiple listeners against each hook
	const hookFieldArr = getDefiniteArray(collectionItem);

	let index = 0;

	// Iterate over each item of hookField
	for (const hookItem of hookFieldArr) {

		// Each hookField maybe a BlueBaseModule, we create one if its not
		const item = getDefiniteBlueBaseModule(hookItem);

		// Resolve listener, so if its another bundle, gets loaded here
		const handlerOrListener = await item.promise;

		let hook: Hook;

		// If the object is an instance of Hook class, we push it and move on
		if (isHook(handlerOrListener)) {
			hook = handlerOrListener;
		}
		// It must be an hook input object with hook props
		else if (isHookInput(handlerOrListener)) {
			hook = new Hook(handlerOrListener);
		}
		// It must only be a handler function
		else if (isFunction(handlerOrListener)) {
			hook = new Hook({ handler: handlerOrListener, name: nameGenerator(eventName, index) });
		}
		// Unkown Input type
		else {
			throw Error('Could not create Hook. Reason: Unrecognized hook format.');
		}

		hookArr.push(hook);
		index++;
	}

	return hookArr;
}
