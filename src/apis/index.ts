import { Accessibility } from './Accessibility';
import { AppState } from './AppState';
import { Clipboard } from './Clipboard';
import { Dimensions } from './Dimensions';
import { GeoLocation } from './GeoLocation';
import { Linking } from './Linking';
import { NetInfo } from './NetInfo';
import { Platform } from './Platform';
import { UserPresence } from './UserPresence';

export type BlueRainAPI = {
	Accessibility?: Accessibility;
	AppState?: AppState;
	Clipboard?: Clipboard;
	Dimensions?: Dimensions;
	GeoLocation?: GeoLocation;
	Linking?: Linking;
	NetInfo?: NetInfo;
	Platform?: Platform;
	UserPresence?: UserPresence;
};

const API: BlueRainAPI = {};
export default API;

export {
	Accessibility,
	AppState,
	Clipboard,
	Dimensions,
	GeoLocation,
	Linking,
	NetInfo,
	Platform,
	UserPresence
};
