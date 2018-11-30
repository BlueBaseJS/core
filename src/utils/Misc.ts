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
 * Creates a random ID.
 * @param chars Number of characters. Defaults to 5
 */
export function makeId(chars: number = 5) {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < chars; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}

	return text;
}

const exportFunctions = {
	isProduction,
	makeId
};

export default exportFunctions;