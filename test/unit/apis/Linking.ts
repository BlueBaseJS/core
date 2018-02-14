import { Linking as ILinking } from '@blueeast/bluerain-os';
import RX from 'reactxp';
import SyncTasks from 'synctasks';

export class Linking implements ILinking {
	// getInitialURL(): SyncTasks.Promise<string> {
	// 	return RX.Linking.getInitialUrl();
	// }
	openURL(url: string): SyncTasks.Promise<void> {
		return RX.Linking.openUrl(url);
	}

	launchSms(smsData: object): SyncTasks.Promise<void> {
		return RX.Linking.launchSms(smsData);
	}
	launchEmail(emailData: object): SyncTasks.Promise<void> {
		return RX.Linking.launchEmail(emailData);
	}
	addEventListener(): void {
		throw new Error('addEventListener property needs to be implemented');
	}
	removeEventListener(): void {
		throw new Error('addEventListener property needs to be implemented');
	}

	canOpenURL(): void {
		throw new Error('addEventListener property needs to be implemented');
	}
	getInitialURL(): string {
		throw new Error('addEventListener property needs to be implemented');
	}
}
