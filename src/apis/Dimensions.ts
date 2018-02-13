export interface Dimensions {
	/**
	 * Add an event handler. Supported events:change
	 * It is supported in react-native only
	 */

	addEventListener: (type: string, handler: () => void) => void;

	/**
	 * Remove an event handler.
	 * It is supported in react-native only
	 */

	removeEventListener: (type: string, handler: () => void) => void;

	/**
	 * This should only be called from native code by sending the didUpdateDimensions event
	 * It is supported in react-native only
	 */

	set: (dims: object) => void;

	/**
	 * Initial dimensions are set before runApplication is called
	 *  so they should be available before any other require's are run, but may be updated later.
	 * It is supported in react-native only
	 */

	get(dim: 'window' | 'screen'): ScaledSize;
}

export interface ScaledSize {
	width: number;
	height: number;
	scale: number;
	fontScale: number;
}
