import { HookNameGeneratorFn } from './types';

/**
 * Default priority for a hook
 */
export const DEFAULT_HOOK_PRIORITY = 10;

/**
 * Default hook name generator function used when parsing HookCollections
 */
export const DEFAULT_HOOK_NAME_GENERATOR_FN: HookNameGeneratorFn =
	(eventName: string, index: number) => `unknown.${eventName}.${index}`;
