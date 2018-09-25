import { BlueRain } from '../BlueRain';

/**
 * A Base Registry
 */
export class Registry<RegistryItemType> {

	/** Internal data */
	protected data: Map<string, RegistryItemType> = new Map();

	constructor(protected BR: BlueRain) {
		//
	}

	/**
	 * The set() method adds or updates an element with a specified
	 * key and value to a Registry object.
	 * @param key
	 * @param value
	 */
	public set(key: string, value: RegistryItemType) {
		this.data.set(key, value);
	}

	/**
	 * The get() method returns a specified element from a Registry object.
	 * @param key
	 */
	public get(key: string) {
		return this.data.get(key);
	}

	/**
	 * The has() method returns a boolean indicating whether an element
	 * with the specified key exists or not.
	 * @param key
	 */
	public has(key: string) {
		return this.data.has(key);
	}

	/**
	 * The delete() method removes the specified element from a Registry object.
	 * @param key
	 */
	public delete(key: string) {
		return this.data.delete(key);
	}

	/**
	 * The clear() method removes all elements from a Registry object.
	 */
	public clear() {
		this.data.clear();
	}

	/**
	 * The entries() method returns a new Iterator object that
	 * contains the [key, value] pairs for each element in the Registry
	 * object in insertion order.
	 */
	public entries() {
		return this.data.entries();
	}

	/**
	 * The forEach() method executes a provided function once per
	 * each key/value pair in the Registry object, in insertion order.
	 * @param callbackfn
	 * @param thisArg
	 */
	public forEach
		(callbackfn: (value: RegistryItemType, key: string, map: Map<string, RegistryItemType>) => void, thisArg?: any) {
		this.data.forEach(callbackfn, thisArg);
	}

	/**
	 * The keys() method returns a new Iterator object that contains
	 * the keys for each element in the Registry object in insertion order.
	 */
	public keys() {
		return this.data.keys();
	}

	/**
	 * The values() method returns a new Iterator object that contains
	 * the values for each element in the Registry object in insertion order.
	 */
	public values() {
		return this.data.values();
	}

	/**
	 * Returns the number of items in the Registry.
	 */
	public size() {
		return this.data.size;
	}
}
