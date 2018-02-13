export interface Linking {
	/**
	 * Add a handler to AppState changes by listening to the change event type and providing the handler
	 * It is supported in react-native only
	 */

	addEventListener: (type: string, handler: () => void) => void;

	/**
	 * Remove a handler by passing the change event type and the handler
	 * It is supported in react-native only
	 */

	removeEventListener: (type: string, handler: () => void) => void;

	/**
	 * Try to open the given url with any of the installed apps.
	 *  The method returns a Promise object.
	 *  If the user confirms the open dialog or the url automatically opens, the promise is resolved.
	 * If the user cancels the open dialog or there are no registered applications for the url, the promise is rejected.
	 * It is supported in react-native only
	 */

	openURL: (url: string) => void;

	/**
	 * Determine whether or not an installed app can handle a given URL.
	 * For web URLs, the protocol ("http://", "https://") must be set accordingly
	 * It is supported in react-native only
	 */

	canOpenURL: (url: string) => void;

	/**
	 * If the app launch was triggered by an app link, it will give the link url,
	 * otherwise it will give null
	 * It is supported in react-native only
	 */

	getInitialURL: () => string | null;
}
