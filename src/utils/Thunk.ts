/**
 * A thunk is function that wraps an expression to delay its evaluation.
 */
export type Thunk<T> = ((...params: any[]) => T);

/**
 * An object that may or may not be a Thunk
 */
export type MaybeThunk<T> = T | Thunk<T>;

/**
 * If the input object is a thunk (function), then executes the function and returns the result.
 * If the input object is not a thunk, it is returned as is.
 *
 * @param input The object to evaluate
 * @param params Any params that need to be passed onto the thunk during execution
 */
export function resolveThunk<T = any>(input: MaybeThunk<T>, ...params: any[]): T {
	return isThunk(input)
		? input(...params)
		: input;
}

/**
 * Checks if an object is a thunk (function).
 * @param input Object to test
 */
export function isThunk<T>(input: MaybeThunk<T>): input is Thunk<T> {
	return (typeof input === 'function');
}