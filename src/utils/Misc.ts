import deepmerge from 'deepmerge';
import isPlainPbject from 'is-plain-object';

/**
 * Creates a unique ID.
 * @param chars Number of characters. Defaults to 5
 */
export function makeId(length: number = 8) {
	let str = '';
	for (let i = 1; i < length + 1; i = i + 8) {
		str += Math.random().toString(36).substr(2, 10);
	}
	return `_${str}`.substr(0, length);
}

/**
 * Deep merges 2 objects. Nested fields are only merged if they are plain objects or arrays.
 * @param x
 * @param y
 */
export function merge<T>(x: Partial<T>, y: Partial<T>) {
	return deepmerge(x, y, {
		isMergeableObject: (i: any) => isPlainPbject(i) || Array.isArray(i),
	});
}
