export type PlatformOSType = 'ios' | 'android' | 'macos' | 'windows' | 'web' | 'electron';
export interface Platform {
	/**
	 * Returns the platform type
	 * Supported in reactxp
	 */
	OS: () => PlatformOSType;

	/**
	 * There is also a Platform.select method available, that given an object containing Platform.OS as keys,
	 * returns the value for the platform you are currently running on.
	 * Supported in react-native
	 */

	select: (type: { ios: object; Android: object }) => void;
}
