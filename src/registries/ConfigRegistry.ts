import { ItemCollection, Registry, RegistryInputItem, RegistryItem } from './Registry';

export { ItemCollection as ConfigCollection } from './Registry';

/**
 * 🎛 ConfigRegistry
 */
export class ConfigRegistry extends Registry<RegistryItem> {
	/**
	 * Registers a value if it's not already registered.
	 * @param item
	 */
	public async registerIfNotExists(
		item: RegistryItem | RegistryItem['value'] | RegistryInputItem | RegistryInputItem['value']
	): Promise<void>;
	public async registerIfNotExists(
		key: string,
		item: RegistryItem | RegistryItem['value'] | RegistryInputItem | RegistryInputItem['value']
	): Promise<void>;
	public async registerIfNotExists<
		T = RegistryItem | RegistryItem['value'] | RegistryInputItem | RegistryInputItem['value']
	>(key: string | T, item?: T): Promise<void> {
		const args = this.getKeyAnyItem(key as any, item);

		if (!this.has(args.key)) {
			this.register(args.key, args.item);
		}
	}

	/**
	 * Registers all collection items that aren't already registered.
	 * @param collection
	 */
	public async registerCollectionIfNotExists(collection: ItemCollection<RegistryInputItem> = []) {
		// If its an array
		if (Array.isArray(collection)) {
			for (const item of collection) {
				await this.registerIfNotExists(item);
			}

			return;
		}
		// If its an object
		else if (collection === Object(collection)) {
			for (const key of Object.keys(collection)) {
				await this.registerIfNotExists(key, collection[key]);
			}

			return;
		}

		throw Error('Could not register collection. Reason: Unknown collection type.');
	}
}
