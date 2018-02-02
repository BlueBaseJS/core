import { BlueRainType } from '../index';
import React from 'react';

/**
 * A BlueRain App options interface
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
export interface AppOptions {
	appName?: string;
	slug?: string;
	category?: string;
	description?: string;
	version?: string;
	appRoutePrefix?: string;
	path?: string;

	icon?: React.ComponentType<any>;
	hidden?: boolean;

	hooks?: { [id: string]: Function };
	components?: { [id: string]: React.ComponentType<any> };

	initialize?(config: {}, ctx: BlueRainType): void;
}

export interface StatelessComponentApp<P = {}> extends React.StatelessComponent<P>, AppOptions {}
export interface ComponentClassApp<P = {}> extends React.ComponentClass<P>, AppOptions {}

export type App<P = {}> = ComponentClassApp<P> | StatelessComponentApp<P>;

/**
 * Converts a React Component to a BlueRain App.
 * @param AppComponent {React.ComponentType<any>}
 * @param options {AppOptions}
 */
export const createApp = (AppComponent: React.ComponentType<any>, options: AppOptions): App => {
	const NewComponent: App = AppComponent;

	if (!options.appName) {
		throw new Error('appName property is required to create a new App');
	}

	for (const k in options) {
		if (options.hasOwnProperty(k)) {
			NewComponent[k] = options[k];
		}
	}

	return NewComponent;
};
