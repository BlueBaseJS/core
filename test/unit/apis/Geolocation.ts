import { GeoLocation as IGeoLocation } from '@blueeast/bluerain-os';
import RX from 'reactxp';
import SyncTasks from 'synctasks';

export class GeoLocation implements IGeoLocation {
	getCurrentPosition(): SyncTasks.Promise<Position> {
		return RX.Location.getCurrentPosition();
	}

	isAvailable(): boolean {
		return RX.Location.isAvailable();
	}

	clearWatch(watchID: number) {
		return RX.Location.clearWatch(watchID);
	}

	stopObserving(): void {
		throw new Error('stopObserving is yet to be implelemnted');
	}

	requestAuthorization(): void {
		throw new Error('requyestAuthorization is yet to be implelemnted');
	}

	setRNConfiguration(): void {
		throw new Error('setRNConfiguration is yet to be implelemnted');
	}
	watchPosition(
		successCallback: () => void,
		errorCallback?: () => void,
		options?: PositionOptions
	): SyncTasks.Promise<number> {
		return RX.Location.watchPosition(successCallback);
	}
}
