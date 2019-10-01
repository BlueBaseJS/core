import { ItemCollection, Registry, RegistryInputItem, RegistryItem } from './Registry';

export { ItemCollection as ConfigCollection } from './Registry';

/**
 * 🎛 ConfigRegistry
 */
export class ConfigRegistry extends Registry<RegistryItem> {
	/**
	 * The set() method adds or updates an element with a specified
	 * key and item to the registry.
	 * @param key
	 * @param value
	 */
	public set(key: string, item: RegistryItem | RegistryInputItem) {
		super.set(key, item);

		const value = this.getValue(key);
		this.BB.Filters.run('bluebase.configs.set', { key, value });

		return this;
	}

	/**
	 * Registers a value if it's not already registered.
	 * @param item
	 */
	public async registerIfNotExists(
		item: RegistryItem | RegistryItem['value'] | RegistryInputItem | RegistryInputItem['value']
	): Promise<void | string>;
	public async registerIfNotExists(
		key: string,
		item: RegistryItem | RegistryItem['value'] | RegistryInputItem | RegistryInputItem['value']
	): Promise<void | string>;
	public async registerIfNotExists<
		T = RegistryItem | RegistryItem['value'] | RegistryInputItem | RegistryInputItem['value']
	>(key: string | T, item?: T): Promise<void | string> {
		const args = this.getKeyAnyItem(key as any, item);

		if (!this.has(args.key)) {
			return this.register(args.key, args.item);
		}
	}

	/**
	 * Registers all collection items that aren't already registered.
	 * @param collection
	 */
	public async registerCollectionIfNotExists(collection: ItemCollection<RegistryInputItem> = []) {
		const keys: string[] = [];

		// If its an array
		if (Array.isArray(collection)) {
			for (const item of collection) {
				const key = await this.registerIfNotExists(item);

				if (key) {
					keys.push(key);
				}
			}

			return keys;
		}
		// If its an object
		else if (collection === Object(collection)) {
			for (const key of Object.keys(collection)) {
				await this.registerIfNotExists(key, collection[key]);
				keys.push(key);
			}

			return keys;
		}

		throw Error('Could not register collection. Reason: Unknown collection type.');
	}
}
