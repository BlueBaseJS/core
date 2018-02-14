import { AppState as IAppState } from '../apis';

export class AppState implements IAppState {
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
}
