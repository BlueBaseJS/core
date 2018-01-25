import React from 'react';
import { BlueRainType } from '../index';
import { ConfigType } from '../config';

/**
 * A BlueRain App base class
 * @property {String}	appName	Name of the app
 * @property {String}	slug	App's slug, used in to build URL
 * @property {String}	category	Category the App belongs to
 * @property {String}	description	App description
 * @property {String}	version	App version
 * @property {String}	appRoutePrefix	Path that will be prepended before slug to build URL.
 * @property {String}	path	Path of the app's home page
 * @property {ReactNode} icon	App's icon component
 * @property {boolean} hidden	If the app should be hidden in launcher listings
 * @property {object} hooks	Hooks object to subscrible all hooks (filters & events)
 * @property {object} components	Components object to register components in the system.
 * 									Internally it uses the `setOrReplace` method of the registry.
 * @property {Function} initialize	Initialize function called during the app initialization phase.
 */
export default class App {
	appName: string;
	slug: string;
	category?: string;
	description?: string;
	version?: string;
	appRoutePrefix: string = '/app';
	path?: string;

	icon?: React.ComponentType<any>;
	hidden?: boolean;

	hooks?: { [id: string]: Function };
	components?: { [id: string]: React.ComponentType<any> };
	initialize?: (config: {}, ctx: BlueRainType) => {};
}
