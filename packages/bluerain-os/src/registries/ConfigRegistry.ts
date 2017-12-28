import set from 'lodash.set';
import get from 'lodash.get';
import merge from 'lodash.merge';
import isNil from 'lodash.isnil';

/**
 * All system configs are stored in this registry
 * @property {Object} ConfigsTable Storage table of all configs
 */
class ConfigRegistry {
	ConfigsTable: {} = {};

	/**
	 * Set a Config
	 */
	set(key: string, value: any) {
		if (isNil(key)) {
			throw new Error('No config key provided');
		}

		if (isNil(value)) {
			throw new Error('No config value provided');
		}

		set(this.ConfigsTable, key, value);
	}

	/**
	 * Get a config value
	 */
	get(key: string): any {
		if (isNil(key)) {
			throw new Error('No config key provided');
		}

		return get(this.ConfigsTable, key);
	}
	/**
	 * Register a Config To be deprecated in 2.0.0
	 */
	register(configs: {}) {
		console.warn(
			'Deprecation Warning: "register" method of ConfigRegistry has been deprecated.',
			' Please use "registerMany" method instead.'
		);
		this.registerMany(configs);
	}
	/**
	 * Register many configs at once
	 */
	registerMany(configs: {}) {
		this.ConfigsTable = merge(this.ConfigsTable, configs);
	}
}

export default ConfigRegistry;
