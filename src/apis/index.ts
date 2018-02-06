import { JsonToReact, JsonToReactClass } from './JsonToReact';
import { Accessibility } from './Accessibility';
import { AppState } from './AppState';
import { BlueRain } from '../';
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
	JsonToReact: JsonToReact;
	Linking?: Linking;
	NetInfo?: NetInfo;
	Platform?: Platform;
	UserPresence?: UserPresence;
};

export const createApis = (ctx: BlueRain): BlueRainAPI => {
	const API: any = {};
	API.JsonToReact = new JsonToReactClass(ctx);

	return API as BlueRainAPI;
};

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
export * from './JsonToReact';
