import { Accessibility as IAccessibility } from '@blueeast/bluerain-os';
import RX from 'reactxp';
import SyncTasks from 'synctasks';

export class Accessibility implements IAccessibility {
	isScreenReaderEnabled(): boolean {
		return RX.Accessibility.isScreenReaderEnabled();
	}

	announceForAccessibility(announcement: string): void {
		return RX.Accessibility.announceForAccessibility(announcement);
	}

	isHighContrastEnabled(): boolean {
		return RX.Accessibility.isHighContrastEnabled();
	}
	fetch() {
		throw new Error('fetch property is yet to be implemented');
	}

	removeEventListener() {
		throw new Error('removeEventListener property is yet to be implemented');
	}

	addEventListener() {
		throw new Error('addEventListener property is yet to be implemented');
	}
	setAccessibilityFocus() {
		throw new Error('setAccessibilityFocus property is yet to be implemented');
	}

	highContrastChangedEvent() {
		throw new Error('highContrastChangedEvent property is yet to be implemented');
	}
	screenReaderChangedEvent() {
		throw new Error('screenReaderChangedEvent property is yet to be implemented');
	}
}
