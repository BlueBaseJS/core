/* @flow */
import { type Element } from 'react';
import kebabCase from 'lodash.kebabcase';

type AppOptions = {
	name: string,
	component: Element<any>,
	slug: string,
	category: string,
	description: string,
	version: string,
	appRoutePrefix: string,
};

export default class App {

	name: string;
	component: Element<*>;
	slug: string;
	category: string;
	description: string;
	version: string;
	appRoutePrefix: string = '/app';

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

	getComponent() : Element<any> {
		return this.component;
	}

	getRootPath(appRoutePrefix: string) : string {
		return `${this.appRoutePrefix}/${this.slug}`;
	}
}
