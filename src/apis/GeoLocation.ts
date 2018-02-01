export interface GeoLocation {
	clearWatch: () => void;

	stopObserving: () => void;

	/**
	 * Sets configuration options that will be used in all location requests.
	 */

	setRNConfiguration: (config: object) => void;

	/**
	 * Request suitable Location permission based on the key configured on pList.
	 * If NSLocationAlwaysUsageDescription is set, it will request Always authorization,
	 * although if NSLocationWhenInUseUsageDescription is set, it will request InUse authorization.
	 */

	requestAuthorization: () => void;

	/**
	 * Invokes the success callback once with the latest location info.
	 * Supported options: timeout (ms), maximumAge (ms), enableHighAccuracy (bool) On Android,
	 * if the location is cached this can return almost immediately, or it will request an update which might take a while.
	 */

	getCurrentPosition: (
		geoSuccess: () => void,
		geoError?: () => void,
		geoOptions?: {
			timeout: number;
			maximumAge: number;
			enableHighAccuracy: boolean;
		}
	) => void;

	/**
	 * useSignificantChanges
	 *  Invokes the success callback whenever the location changes.
	 *  Supported options: timeout (ms), maximumAge (ms), enableHighAccuracy (bool), distanceFilter(m), useSignificantChanges (bool)
	 */

	watchPosition(
		success: () => void,
		error?: () => void,
		options?: {
			timeout: number;
			maximumAge: number;
			enableHighAccuracy: boolean;
			distanceFilter: any;
			useSignificantChanges: any;
		}
	);

	/**
	 * It is used in reactxp
	 */

	isAvailable(): boolean;
}
