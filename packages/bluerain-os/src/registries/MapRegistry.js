/* @flow */

import { Map } from 'immutable';
import isNil from 'lodash.isnil';

/**
 * A generic Registry class in the BlueRain OS. Used to store data.
 */
export default class Registry {

	name: string;
	data: Map<string, any>;

	constructor(name: string) {

		if (!name) {
			throw new Error('Registry name is required');
		}

		this.name = name;
		this.data = Map();
	}

	/**
	 * Add an item to the Registry.
	 *
	 * @param {string} key The key of the item
	 * @param {any} item  The item to add
	 */
	set(key: string, item: any) {
		if (isNil(key)) {
			throw new Error(`No key provided in the add method of ${this.name} registry.`);
		}

		if (isNil(item)) {
			throw new Error(`No item provided in the add method of ${this.name} registry.`);
		}

		if (this.data.has(key)) {
			throw new Error(`An item with ${key} key already exists in the ${this.name} registry. Try using the "replace" method instead.`);
		}

		this.data = this.data.set(key, item);
	}

	/**
	 * Add an item to the Registry.
	 * Alias of 'set' method.
	 *
	 * @param {string} key The key of the item
	 * @param {any} item  The item to add
	 */
	add(key: string, item: any) {
		this.set.apply(null, arguments); // eslint-disable-line
	}
	
	/**
	 * Add an item to the Registry.
	 * Alias of 'set' method.
	 *
	 * @param {string} key The key of the item
	 * @param {any} item  The item to add
	 */
	register(key: string, item: any) {
		this.set.apply(null, arguments); // eslint-disable-line
	}

	/**
	 * Replace an item in the Registry.
	 *
	 * @param {string} key The key of the item
	 * @param {any} item  The item to add
	 */
	replace(key: string, item: any) {
		if (isNil(key)) {
			throw new Error(`No key provided in the add method of ${this.name} registry.`);
		}

		if (isNil(item)) {
			throw new Error(`No item provided in the add method of ${this.name} registry.`);
		}

		if (!this.has(key)) {
			throw new Error(`An item with ${key} key does not exist in the ${this.name} registry. Try using the "add" method instead.`);
		}

		this.data = this.data.set(key, item);
	}

	/**
	 * Get an item from the Registry by its key.
	 *
	 * @param {string} key The key of the item
	 * @returns {any}
	 */
	get(key: string) : any {
		if (isNil(key)) {
			throw new Error(`No key provided in the get method of ${this.name} registry.`);
		}

		return this.data.get(key);
	}

	/**
	 * Check if an item is registered.
	 *
	 * @param {string} name The name of the item to check
	 * @returns {boolean}
	 */
	has(key: string) : boolean {
		if (isNil(key)) {
			throw new Error(`No key provided in the has method of ${this.name} registry.`);
		}

		return this.data.has(key);
	}

	/**
	 * Remove a plugin from the registry
	 * @param {string} key The key plugin to remove
	 */
	remove(key: string) {
		if (isNil(key)) {
			throw new Error(`key cannot be ${key} in the remove method of ${this.name} registry.`);
		}
		if (!this.data.has(key)) {
			throw new Error(`${key} is not registered in the ${this.name} registry.`);
		}

		this.data = this.data.delete(key);
	}

}
