export interface NetInfo {
	/**
	 * ConnectionType describes the type of connection the device is using to communicate with the network.
	 * It is supported in react-native only
	 */
	ConnectionType:
		| 'none'
		| 'wifi'
		| 'cellular'
		| 'unknown'
		| 'bluetooth'
		| 'ethernet'
		| 'wimax'
		| '2g'
		| '3g'
		| '4g';

	/**
	 * Available on Android. Detect if the current active connection is metered or not.
	 *  A network is classified as metered when the user is sensitive to heavy data usage on that connection due to monetary costs,
	 *  data limitations or battery/performance issues.
	 */

	isConnectionExpensive: () => void;

	/**
	 * Available on all platforms. Asynchronously fetch a boolean to determine internet connectivity.
	 */

	isConnected: () => void;

	/**
	 * Adds an event handler. Supported events:change,connectionChange
	 * connectionChange: Fires when the network status changes. The argument to the event handler is an object with keys:
	 * type: A ConnectionType (listed above)
	 * effectiveType: An EffectiveConnectionType (listed above)change:
	 * This event is deprecated. Listen to connectionChange instead. Fires when the network status changes. The argument to the event handler is one of the deprecated connectivity types listed above.
	 */

	addEventListener: (eventName: string, handler: () => void) => void;

	/**
	 * Removes the listener for network status changes
	 */

	removeEventListener: (eventName: string, handler: () => void) => void;

	/**
	 * Returns a promise that resolves to an object with type and effectiveType keys
	 * whose values are a ConnectionType and an EffectiveConnectionType, (described above), respectively.
	 */

	getConnectionInfo: () => void;
}
