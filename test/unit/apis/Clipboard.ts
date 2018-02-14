import { Clipboard as IClipboard } from '@blueeast/bluerain-os';
import RX from 'reactxp';
import SyncTasks from 'synctasks';

export class Clipboard implements IClipboard {
	getString(): SyncTasks.Promise<string> {
		return RX.Clipboard.getText();
	}

	setString(text: string): void {
		RX.Clipboard.setText(text);
	}
}
