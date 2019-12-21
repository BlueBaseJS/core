import { BlueBase } from '../../BlueBase';
import { isProduction } from '../../utils';

// Number of errors to save
const CACHE_SIZE = 5;

// If a successive error take longer than this time, we don't consider it as recursive
const RECURSIVE_PERIOD = 300;

let errors: Array<{
	error: any;
	time: number;
}> = [];

/**
 * If the app is in production mode, automatically reboots BB on exception.
 * Shows an error message if the app is stuck in infinite crash.
 * @param BB
 */
export function useExceptionHandlingOnProduction(BB: BlueBase) {
	let development = BB.Configs.getValue('development');

	if (development === undefined) {
		development = !isProduction();
	}

	/**
	 * Adds an error to the errors array, with the timestamp
	 * @param e
	 */
	function addError(e: any) {
		const arr = [
			...errors,
			{
				error: e,
				time: new Date().getTime(),
			},
		];

		errors = arr.length > CACHE_SIZE ? arr.slice(1) : arr;
	}

	/**
	 * Gets periods of time in successive errors
	 */
	function isInfinite() {
		if (errors.length < CACHE_SIZE) {
			return false;
		}

		for (let i = 1; i < errors.length; i++) {
			if (errors[i].time - errors[i - 1].time > RECURSIVE_PERIOD) {
				return false;
			}
		}

		return true;
	}

	function onError(e: any) {
		addError(e);

		if (!development && !isInfinite()) {
			BB.reboot();
		}
	}

	return { onError };
}
