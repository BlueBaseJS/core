/* @flow */

import set from 'lodash.set';
import get from 'lodash.get';
import merge from 'lodash.merge';

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
		if (key === undefined || key === null) {
			throw new Error('No config key provided');
		}

		if (value === undefined || value === null) {
			throw new Error('No config value provided');
		}

		set(this.ConfigsTable, key, value);
	}

	/**
	 * Get a config value
	 */
	get(key: string) : any {
		if (key === undefined || key === null) {
			throw new Error('No config key provided');
		}

		return get(this.ConfigsTable, key);
	}

	/**
	 * Register many configs at once
	 */
	register(configs: {}) {
		this.ConfigsTable = merge(this.ConfigsTable, configs);
	}
}

const configRegistry = new ConfigRegistry();
export default configRegistry;
