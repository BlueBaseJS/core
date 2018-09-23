export type MaybePromise<T> = T | Promise<T>;

export function getDefinitePromise<T = any>(object: MaybePromise<T>): Promise<T> {

	return !isPromise<T>(object)
		? Promise.resolve(object)
		: object as Promise<T>;
}

// FIXME: object is Promise?
export function isPromise<T>(object: any): object is MaybePromise<T> {
	return !!object && 'function' === typeof (object as Promise<T>).then;
}
