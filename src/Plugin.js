// base class of a plugin which is to be extended
export default class Plugin {

	constructor(config) {
		this.config = config;
	}

    // To initialize Plagin i.e To add all the callbacks against the specific plugin
	initialize() {

	}
}
