/**
 * An ES Module
 */
export type EsModule<T> = {
	__esModule?: boolean;
	default: T;
	[key: string]: any;
};

/**
 * An object that may or may not be an ES Module
 */
export type MaybeEsModule<T> = T | EsModule<T>;

/**
 * If an input object is an ES module, returns object.default, otherwise returns the object as is.
 * @param object Input object
 */
export function getDefiniteModule<T = any>(object: MaybeEsModule<T>): T {

	return (object as EsModule<T>).default
		? ((object as EsModule<T>).default as T)
		: object as T;
}

/**
 * Checks if an object is an ES module.
 * @param object Input object
 */
// FIXME: Explore better typings
export function isEsModule<T>(object: any): object is EsModule<T> {
	return object.default !== undefined;
}