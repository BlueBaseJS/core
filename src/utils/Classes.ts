/**
 * Checks if a variable is a class
 * @param input Input object to test
 */
export function isClass(input: any) {
	return typeof input === 'function'
		&& /^class\s/.test(Function.prototype.toString.call(input));
}
