import { BlueBaseConfigs } from './types';
import { Registry } from '../Registry';
import { makeId } from '../../utils';

export interface ConfigsCollection extends Partial<BlueBaseConfigs> {}

export interface ConfigRegistryItem<T = any> {
	value: T;
	subscriptions: {
		[key: string]: (value: T) => void;
	};
}

/**
 * 🎛 ConfigRegistry
 */
export class ConfigRegistry extends Registry<ConfigRegistryItem> {

	/**
	 * Registers a config property. But before registering it, that config is filtered
	 * through the 'bluebase.config.beforeSave' hook.
	 * @param key Config key
	 * @param value Config value
	 */
	public async register<T>(key: string, value: T) {

		const config: {
			key: string,
			value: T
		} = await this.BB.Hooks.run('bluebase.config.beforeSave', { key, value });

		const item: ConfigRegistryItem<T> = this.get(key) || { value: config.value, subscriptions: {} };
		item.value = config.value;
		this.set(config.key, item);
		this.publish(config.key, config.value);
	}

	/**
	 * Registers multiple configs at once. Takes a config object as input.
	 * @param collection
	 */
	public async registerCollection(collection: ConfigsCollection) {
		for (const item of Object.keys(collection)) {
			await this.register(item, collection[item]);
		}
	}

	/**
	 * Filter configs by a predicate function.
	 * @param predicate
	 */
	public filter(predicate: (value: any, key: string) => boolean) {

		const arr = Array.from(this.entries()).filter((entry) => predicate(entry[1].value, entry[0]));
		const configs: { [key: string]: any } = {};

		Array.from(arr).forEach(entry => {
			configs[entry[0]] = entry[1].value;
		});

		return configs;
	}

	/**
	 * Get value of a config item
	 * @param key Config key
	 */
	public getValue(key: string) {
		const item = this.get(key);

		if (!item) {
			return;
		}

		return item.value;
	}

	/**
	 * Subscribe to a config value update
	 * @param key Config key
	 * @param callback Callback function
	 * @returns Subscription ID
	 */
	public subscribe(key: string, callback: (value: any) => void): string {
		let item = this.get(key);

		if (!item) {
			item = { value: undefined, subscriptions: {} };
		}

		// If theres no subscriptions object, create one
		if (!item.subscriptions) {
			item.subscriptions = {};
		}

		// Create a unique subscription ID
		const subId = this.createUniqueSubscriptionId(item.subscriptions);

		// Set the callback function
		item.subscriptions[subId] = callback;

		// Save the updated item
		this.set(key, item);

		return subId;
	}

	/**
	 * Unsubscribe from a config value update
	 * @param key Config key
	 * @param subscriptionId Subscription ID
	 */
	public unsubscribe(key: string, subscriptionId: string) {
		const item = this.get(key);

		if (!item) {
			throw Error(`Could not unsubscribe from a configuration. Reason: No configuration with key ${key} registered.`);
		}

		if (!item.subscriptions[subscriptionId]) {
			// tslint:disable-next-line
			throw Error(`Could not unsubscribe from a configuration. Reason: No subscription with id ${subscriptionId} registered.`);
		}

		delete item.subscriptions[subscriptionId];

		this.set(key, item);
	}

	/**
	 * Creates a unique subscription ID for a given list of subscriptions.
	 * @param subscriptions An object containing current subscriptions
	 */
	private createUniqueSubscriptionId(subscriptions: ConfigRegistryItem['subscriptions']) {
		while(true) {
			const id = makeId();

			if (!subscriptions[id]) {
				return id;
			}
		}
	}

	/**
	 * Publishes updates of a config value change to all the subscribers
	 * @param key Config key
	 * @param value Config value
	 */
	private publish(key: string, value: any) {
		const item = this.get(key);

		if (!item) {
			// tslint:disable-next-line
			throw Error(`Could not publish a configuration update to subscribers. Reason: No configuration with key ${key} registered.`);
		}

		Object.keys(item.subscriptions).forEach((subId) => {
			item.subscriptions[subId](value);
		});
	}
}

