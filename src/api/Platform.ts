import RX from 'reactxp';
import isElectron from 'is-electron';

export type PlatformType = 'web' | 'server' | 'ios' | 'android' | 'windows' | 'electron';

/**
 * This interface provides information about the OS or runtime platform on which the app is running.
 */
export default class Platform {
	static isOnServer: boolean = false;

	/**
	 * @return {string} PlatformType ('web' | 'server' | 'ios' | 'android' | 'windows' | 'electron')
	 */
	static getType(): PlatformType {
		if (Platform.isOnServer === true) {
			return 'server';
		}

		const type: PlatformType = RX.Platform.getType();

		if (type === 'web' && isElectron()) {
			return 'electron';
		}

		return type;
	}

	/**
	 * Set the Platform to 'server'.
	 * Useful to see if the app is rendering on server due to SSR.
	 *
	 * @param {boolean} mode
	 */
	static setServerMode(mode: boolean = false) {
		Platform.isOnServer = mode;
	}
}
