export type MaybeArray<T> = T | T[];

export function getDefiniteArray<T>(maybeArray: MaybeArray<T>): T[] {
	return Array.isArray(maybeArray) ? maybeArray : [maybeArray];
}