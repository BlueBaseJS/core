import { JsonToReact, JsonToReactClass } from './JsonToReact';
import { Accessibility } from './Accessibility';
import { AppState } from './AppState';
import { AsyncStorage } from './AsyncStorage';
import { BlueRain } from '../';
import { Clipboard } from './Clipboard';
import { Dimensions } from './Dimensions';
import { GeoLocation } from './GeoLocation';
import { Linking } from './Linking';
import { NetInfo } from './NetInfo';
import { Platform } from './Platform';
import { StubAPI } from './StubAPI';
import { UserPresence } from './UserPresence';

export type BlueRainAPI = {
	Accessibility: Accessibility;
	AppState: AppState;
	Clipboard: Clipboard;
	Dimensions: Dimensions;
	GeoLocation: GeoLocation;
	JsonToReact: JsonToReact;
	Linking: Linking;
	NetInfo: NetInfo;
	Platform: Platform;
	UserPresence: UserPresence;
	AsyncStorage: AsyncStorage;
};

export const createApis = (ctx: BlueRain): BlueRainAPI => {
	const API: any = {};
	API.Accessibility = StubAPI('Accessibility');
	API.AppState = StubAPI('AppState');
	API.Clipboard = StubAPI('Clipboard');
	API.Dimensions = StubAPI('Dimensions');
	API.GeoLocation = StubAPI('GeoLocation');
	API.JsonToReact = new JsonToReactClass(ctx);
	API.Linking = StubAPI('Linking');
	API.NetInfo = StubAPI('NetInfo');
	API.Platform = StubAPI('Platform');
	API.UserPresence = StubAPI('UserPresence');

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
	UserPresence,
	AsyncStorage
};
export * from './JsonToReact';
