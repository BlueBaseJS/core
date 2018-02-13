export interface AsyncStorage {
	// Clears all local storage keys
	clear(): void;

	// Returns an item by key
	getItem(key: string): void;

	// Deletes an item by key
	removeItem(key: string): void;

	// Sets or replaces the value of an item by key
	setItem(key: string, value: string): void;

	//  Merges an existing key value with an input value, assuming both values are stringified JSON.
	// Returns a Promise object.

	mergeItem(): void;
	// Gets all keys known to your app; for all callers, libraries, etc. Returns a Promise object.
	getAllKeys(): void;

	// Flushes any pending requests using a single batch call to get the data.

	flushGetRequests(): Object;

	// This allows you to batch the fetching of items given an array of key inputs.
	// Your callback will be invoked with an array of corresponding key-value pairs found:
	multiGet(keys: string[]): void;

	// Use this as a batch operation for storing multiple key-value pairs. When the operation completes.
	//  you'll get a single callback with any errors:
	multiSet(keyValuePairs: string[][]): void;

	// Call this to batch the deletion of all keys in the keys array. Returns a Promise object.

	multiRemove(keys: string[]): void;

	// Batch operation to merge in existing and new values for a given set of keys.
	// This assumes that the values are stringified JSON.
	// Returns a Promise object.
	multiMerge(keyValuePairs: string[]): void;
}
