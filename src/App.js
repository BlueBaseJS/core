/* @flow */
import { type Element } from 'react';
import kebabCase from 'lodash.kebabcase';

type AppOptions = {
	name: String,
	component: Element<any>,
	slug?: String,
	category?: String,
	description?: String,
	version?: String,
};

export default class App {

	name: String;
	component: Element<*>;
	slug: String;
	category: String;
	description: String;
	version: String;
	appRoutePrefix: String = '/app';

	constructor(opts: AppOptions) {

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

	getComponent() {
		return this.component;
	}

	getRootPath(appRoutePrefix) {
		return `${this.appRoutePrefix}/${this.slug}`;
	}
}
