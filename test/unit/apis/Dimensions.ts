import { Dimensions as IDimensions } from '@blueeast/bluerain-os';
import RX from 'reactxp';

export class Dimensions implements IDimensions {
	get(): void {}

	set(): void {
		throw new Error('set property is yet to be implemented');
	}

	addEventListener(): void {
		throw new Error('addEventListener property is yet to be implemented');
	}

	removeEventListener(): void {
		throw new Error('removeEventListener property is yet to be implemented');
	}
}
