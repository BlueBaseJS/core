export interface Platform {
	/**
	 * List of Platforms
	 * Supported in reactxp
	 */
	PlatformType: 'web' | 'ios' | 'android' | 'windows';

	/**
	 * Returns the platform type
	 * Supported in reactxp
	 */
	getType: () => void;

	/**
	 * Platform.OS will be ios when running on iOS and android when running on Android.
	 * Supported in react-native
	 */
	OS: string;

	/**
	 * There is also a Platform.select method available, that given an object containing Platform.OS as keys,
	 * returns the value for the platform you are currently running on.
	 * Supported in react-native
	 */

	select: (type: { ios: object; Android: object }) => void;
}
