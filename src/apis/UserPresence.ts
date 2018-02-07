export interface UserPresence {
	/**
	 *
	 * It is supported by reactsxp
	 */
	userPresenceChangedEvent: (isPresent: boolean) => void;

	/**
	 * Indicates whether the user is currently present
	 * It is supported by reactsxp
	 */
	isUserPresent(): boolean;
}
