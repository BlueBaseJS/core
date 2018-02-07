import { BlueRain } from '../index';
import get from 'lodash.get';
import isNil from 'lodash.isnil';
import merge from 'lodash.merge';
import set from 'lodash.set';

/**
 * All system configs are stored in this registry
 * @property {Object} data Storage table of all configs
 */
class ConfigRegistry {
	data: {} = {};
	BR: BlueRain;

	constructor(ctx: BlueRain) {
		this.BR = ctx;
	}

	/**
	 * Set a Config
	 */
	set(key: string, value: any) {
		if (isNil(key)) {
			throw new Error('No config key provided. Please provide valid key while adding config.');
		}

		if (isNil(value)) {
			throw new Error('No config value provided. Please provide valid value while adding config.');
		}

		set(this.data, key, value);
	}

	/**
	 * Get a config value
	 */
	get(key: string): any {
		if (isNil(key)) {
			throw new Error('No config key provided. Please provide valid key while getting config.');
		}

		return get(this.data, key);
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
		this.data = merge(this.data, configs);
	}

	/**
	 * Clear Configs
	 */
	clear() {
		this.data = {};
	}
}

export default ConfigRegistry;
