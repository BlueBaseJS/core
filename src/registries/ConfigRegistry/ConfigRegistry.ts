import { BlueBaseConfigs } from './types';
import { Registry } from '../Registry';

export interface ConfigsCollection extends Partial<BlueBaseConfigs> {}

/**
 * 🎛 ConfigRegistry
 */
export class ConfigRegistry extends Registry<any> {

	/**
	 * Registers a config property. But before registering it, that config is filtered
	 * through the 'bluebase.configs.register' hook.
	 * @param key Config key
	 * @param value Config value
	 */
	public async register<T>(key: string, value: T) {

		const config: {
			key: string,
			value: T
		} = await this.BB.Hooks.run('bluebase.configs.register', { key, value });

		this.set(config.key, config.value);
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

		const arr = Array.from(this.entries()).filter((entry) => predicate(entry[1], entry[0]));
		const configs: { [key: string]: any } = {};

		Array.from(arr).forEach(entry => {
			configs[entry[0]] = entry[1];
		});

		return configs;
	}
}

