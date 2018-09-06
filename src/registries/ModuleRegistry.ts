import { BlueRainModule } from '../utils/BlueRainModule';

export class ModuleRegistry<T> {

	/** Internal data */
	protected data: Map<string, BlueRainModule<T>> = new Map();

	/**
	 * The set() method adds or updates an element with a specified
	 * key and value to a Registry object.
	 * @param key
	 * @param value
	 */
	public set(key: string, value: T) {
		this.data.set(key, new BlueRainModule(value));
	}

	/**
	 * The get() method returns a promise which resolves a specified element from a Registry object.
	 * @param key
	 */
	public get(key: string) {
		const moduleObj = this.data.get(key);
		return moduleObj ? moduleObj.promise : undefined;
	}

	/**
	 * The get() method returns a specified element from a
	 * Registry object.
	 * @param key
	 */
	public getModule(key: string) {
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
}