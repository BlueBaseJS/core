import { NetInfo as INetInfo } from '@blueeast/bluerain-os';
import RX from 'reactxp';
import SyncTasks from 'synctasks';

export class NetInfo implements INetInfo {
	ConnectionType: 'none';
	isConnected(): SyncTasks.Promise<boolean> {
		return RX.Network.isConnected();
	}
	isConnectionExpensive(): void {
		throw new Error(' isConnectionExpensive property is yet to be implemented');
	}
	addEventListener(): void {
		throw new Error(' isConnectionExpensive property is yet to be implemented');
	}

	removeEventListener(): void {
		throw new Error(' isConnectionExpensive property is yet to be implemented');
	}
	getConnectionInfo(): void {
		throw new Error(' getConnectionInfo property is yet to be implemented');
	}
}
