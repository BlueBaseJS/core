import { BlueRain } from '../index';
import { hookFn } from '../registries/HooksRegistry';
import React from 'react';

/** Possible values of AppIcon type field. */
export type AppIconType = 'component' | 'name' | 'image';

/** Base model of AppIcon */
export interface AppIconBase {
	type: AppIconType;
}

/** AppIcon as a custom component */
export interface AppIconComponent extends AppIconBase {
	type: 'component';

	/**
	 * Either a component or a component name (string).
	 * In case of string, it will be fetched from Component Registry.
	 */
	component: React.ComponentType<any> | string;
}

/** AppIcon as a BR.Components.Icon component */
export interface AppIconName extends AppIconBase {
	type: 'name';

	/** The name prop of the BR.Components.Icon component */
	name: string;
}

/** AppIcon as an image */
export interface AppIconImage extends AppIconBase {
	type: 'image';

	/** The image source */
	source: string;
}

export type AppIcon = AppIconComponent | AppIconImage | AppIconName;

/** A BlueRain App options interface */
export interface AppOptions {
	/** Name of the app */
	appName: string;

	/** App's slug, used in to build URL */
	slug?: string;

	/** Category the App belongs to */
	category?: string;

	/** App description */
	description?: string;

	/** App version */
	version?: string;

	/** Path that will be prepended before slug to build URL */
	appRoutePrefix?: string;

	/** Path of the app's home page */
	path?: string;

	/** App's icon definition */
	icon?: AppIcon | ((app: App, BR: BlueRain) => AppIcon);

	/** If the app should be hidden in launcher listings */
	hidden?: boolean;

	/** Hooks object to subscrible all hooks (filters & events) */
	hooks?: { [id: string]: hookFn };

	/**
	 * Components object to register components in the system.
	 * Internally it uses the `setOrReplace` method of the registry.
	 */
	components?: { [id: string]: React.ComponentType<any> };

	/** Initialize function called during the app initialization phase. */
	initialize?(config: {}, ctx: BlueRain): void;

	[key: string]: any;
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
	const NewComponent = AppComponent as App;

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
