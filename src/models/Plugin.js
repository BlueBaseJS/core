/* @flow */

import kebabCase from 'lodash.kebabcase';

/**
 * Base class of a plugin which is to be extended.
 * @property {String}	name	Name of the app
 * @property {String}	slug	App's slug, used in to build URL
 * @property {object}	config	Plugin configurations
 * @property {String}	category	Category the App belongs to
 * @property {String}	version	App version
 */
export default class Plugin {

	name: string;
	slug: string;
	config: {};
	category: string;
	description: string;
	version: string;

	constructor(opts: {
		name: string,
		slug: string,
		config: string,
		category: string,
		description: string,
		version: string,
	}) {

		opts = opts || {};

		if (!opts.name) {
			throw new Error('Plugin name not given.');
		}

		this.name = opts.name;

		if (!opts.slug) {
			opts.slug = opts.name;
		}

		this.slug = kebabCase(opts.slug);
		this.category = opts.category;
		this.description = opts.description;
		this.version = opts.version;
	}

  /**
	 * To initialize Plagin i.e To add all the callbacks against the specific plugin
	 */
	// initialize() {}
}
