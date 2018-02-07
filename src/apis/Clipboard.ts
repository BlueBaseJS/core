export interface Clipboard {
	/**
	 * Get content of string type, this method returns a Promise,
	 * so you can use following code to get clipboard content
	 * It is suported for reactxp and reactnative
	 */
	getString: () => void;

	/**
	 * Set content of string type. You can use following code to set clipboard content
	 */
	setString: (content: string) => void;
}
