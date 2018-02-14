import { AsyncStorage as IAsyncStorage } from '@blueeast/bluerain-os';
import RX from 'reactxp';
import SyncTasks from 'synctasks';

export class AsyncStorage implements IAsyncStorage {
	setItem(key: string, value: string): void {
		RX.Storage.setItem(key, value);
	}

	getItem(key: string): void {
		RX.Storage.getItem(key);
	}
	removeItem(key: string): void {
		RX.Storage.removeItem(key);
	}
	clear(): void {
		RX.Storage.clear();
	}
	mergeItem() {
		throw new Error('mergeItem property is yet to be implemented');
	}

	getAllKeys() {
		throw new Error('getAllKeys property is yet to be implemented');
	}

	flushGetRequests() {
		return () => {
			throw new Error('flushGetRequests property is yet to be implemented');
		};
	}

	multiGet() {
		return () => {
			throw new Error('multiGet property is yet to be implemented');
		};
	}

	multiSet() {
		return () => {
			throw new Error('multiSet property is yet to be implemented');
		};
	}

	multiMerge() {
		return () => {
			throw new Error('multiRemove property is yet to be implemented');
		};
	}

	multiRemove() {
		return () => {
			throw new Error('multiRemove property is yet to be implemented');
		};
	}
}
