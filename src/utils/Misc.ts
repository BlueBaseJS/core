declare var process: any;

export function isProduction() {

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