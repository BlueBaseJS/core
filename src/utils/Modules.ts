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
export type MaybeEsModule<T> = EsModule<T> | T;

/**
 * If an input object is an ES module, returns object.default, otherwise returns the object as is.
 * @param object Input object
 */
export function getDefiniteModule<T = any>(object: MaybeEsModule<T>): T {

	return isEsModule(object)
		? (object.default)
		: object;
}

/**
 * Checks if an object is an ES module.
 * @param object Input object
 */
export function isEsModule<T>(object: MaybeEsModule<T>): object is EsModule<T> {
	return (object as EsModule<T>).default !== undefined;
}