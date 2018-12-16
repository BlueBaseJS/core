/**
 * An object that may or may not be a Promise
 */
export type MaybePromise<T> = T | Promise<T>;

/**
 * Take an input obect. If the input is a promise, returns as is.
 * Other wise creates a promise that resolves the input.
 * @param object Input object
 */
export function getDefinitePromise<T = any>(object: MaybePromise<T>): Promise<T> {

	return !isPromise<T>(object)
		? Promise.resolve(object)
		: object as Promise<T>;
}

/**
 * Checks if an object is a Promise
 * @param object Input object
 */
export function isPromise<T>(object: any): object is Promise<T> {
	return !!object && 'function' === typeof (object as Promise<T>).then;
}
