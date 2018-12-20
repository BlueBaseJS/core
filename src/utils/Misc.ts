declare var process: any;

/**
 * Check if the project is running in production mode. Returns 'true' if it is.
 */
export function isProduction(): boolean {
	// Web
	if (process && process.env && process.env.NODE_ENV) {
		return process.env.NODE_ENV === 'production';
	}

	// react-native
	if (__DEV__) {
		return false;
	}

	return true;
}

/**
 * Creates a unique ID.
 * @param chars Number of characters. Defaults to 5
 */
export function makeId(length: number = 8) {
	let str = '';
	for (let i = 1; i < length + 1; i = i + 8) {
		str += Math.random()
			.toString(36)
			.substr(2, 10);
	}
	return ('_' + str).substr(0, length);
}
