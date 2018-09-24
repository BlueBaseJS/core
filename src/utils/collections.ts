/**
 * An object that may or may not be an array
 */
export type MaybeArray<T> = T | T[];

/**
 * If an input is an array, returns as is. Otherwise creates a new array with input object at index 0 and returns it.
 * @param input Input object
 */
export function getDefiniteArray<T>(input: MaybeArray<T>): T[] {
	return Array.isArray(input) ? input : [input];
}