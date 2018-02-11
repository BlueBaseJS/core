import { Component } from 'react';

export interface Accessibility {
	/**
	 * Query whether a screen reader is currently enabled. Returns a promise which resolves to a boolean.
	 * The result is true when a screen reader is enabled and false otherwise.
	 * It is supported in reactxp
	 */

	fetch: () => void;

	/**
	 * Add an event handler. Supported events:
	 * change: Fires when the state of the screen reader changes. The argument to the event handler is a boolean.
	 * The boolean is true when a screen reader is enabled and false otherwise.
	 * announcementFinished: iOS-only event. Fires when the screen reader has finished making an announcement.
	 * The argument to the event handler is a dictionary with these keys:
	 * announcement: The string announced by the screen reader.
	 * success: A boolean indicating whether the announcement was successfully made.
	 * It is supported in react-native
	 */

	addEventListener: (eventName: string, handler: () => void) => void;

	/**
	 * iOS-Only. Set accessibility focus to a react component.
	 * It is supported in react-native
	 */

	setAccessibilityFocus: (reactTag: Component) => void;

	/**
	 * Remove an event handler.
	 * It is supported in react-native
	 */

	removeEventListener: (eventName: string, handler: () => void) => void;

	/**
	 * Triggered when the high-contrast setting changes.
	 * This support is  in Reactxp
	 */
	highContrastChangedEvent: (isEnabled: boolean) => void;

	/**
	 * Triggered when the screen reader setting changes.
	 * This support is  in Reactxp
	 */
	screenReaderChangedEvent: (isEnabled: boolean) => void;

	/**
	 * Sends the specified string to the screen reader.
	 * This support is  in Reactxp and react-native
	 */

	announceForAccessibility: (announcement: string) => void;

	/**
	 * Indicates whether a screen reader is currently enabled.
	 * This support is  in Reactxp
	 */

	isScreenReaderEnabled(): boolean;

	/**
	 * Inidicates whether the OS-level "high-contrast" setting is enabled.
	 * This support is  in Reactxp
	 */

	isHighContrastEnabled(): boolean;
}
