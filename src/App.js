/* @flow */
import { type Element as ReactElement } from 'react';
import kebabCase from 'lodash.kebabcase';

/**
 * A BlueRain App base class
 * @property {String}	name	Name of the app
 * @property {ReactElement}	component	The main component of the App
 * @property {String}	slug	App's slug, used in to build URL
 * @property {String}	category	Category the App belongs to
 * @property {String}	version	App version
 * @property {String}	appRoutePrefix	Path that will be prepended before slug to build URL.
 */
export default class App {

	name: string;
	component: ReactElement<*>;
	slug: string;
	category: string;
	description: string;
	version: string;
	appRoutePrefix: string = '/app';

	constructor(opts: {
		name: string,
		component: ReactElement<any>,
		slug: string,
		category: string,
		description: string,
		version: string,
		appRoutePrefix: string,
	}) {

		opts = opts || {};

		if (!opts.name) {
			throw new Error('App name not given.');
		}

		if (!opts.component) {
			throw new Error('App component is required!');
		}

		this.name = opts.name;

		if (!opts.slug) {
			opts.slug = opts.name;
		}

		this.component = opts.component;
		this.slug = kebabCase(opts.slug);
		this.category = opts.category;
		this.description = opts.description;
		this.version = opts.version;
		this.appRoutePrefix = opts.appRoutePrefix;
	}

	/**
	 * Get the Apps main component.
	 */
	getComponent() : ReactElement<any> {
		return this.component;
	}

	/**
	 * Get the App's URL
	 */
	getPath() : string {
		return `${this.appRoutePrefix}/${this.slug}`;
	}
}
