/* @flow */

/**
 * Base class of a plugin which is to be extended.
 * @property {object}	config	Plugin configurations
 */
export default class Plugin {

	config: {};

	constructor(config: {}) {
		this.config = config;
	}

    /**
	 * To initialize Plagin i.e To add all the callbacks against the specific plugin
	 */
	initialize() {

	}
}
