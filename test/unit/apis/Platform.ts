import { Platform as IPlatform } from '../apis/';
import RX from 'reactxp';
import isElectron from 'is-electron';

export type PlatformType = 'web' | 'ios' | 'android' | 'windows';

/**
 * This interface provides information about the OS or runtime platform on which the app is running.
 */
export default class Platform implements IPlatform {
	/**
	 * @return {string} PlatformType ('web' | 'server' | 'ios' | 'android' | 'windows' | 'electron')
	 */
	OS(): PlatformType {
		const type: any = RX.Platform.getType();
		if (type === 'web' && isElectron()) {
			return 'electron';
		}

		return type;
	}

	select() {
		throw new Error('Select needs to be implemented by the platform');
	}
}
