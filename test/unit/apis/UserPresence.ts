import { UserPresence as IUserPresence } from '@blueeast/bluerain-os';
import RX from 'reactxp';
import SyncTasks from 'synctasks';

export class UserPresence implements IUserPresence {
	isUserPresent(): boolean {
		return RX.UserPresence.isUserPresent();
	}
	userPresenceChangedEvent(): void {
		throw new Error('userPresenceChangedEvent is yet to be implemented');
	}
}
