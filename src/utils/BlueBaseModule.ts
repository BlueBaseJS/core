import { MaybeEsModule, getDefiniteModule } from './Modules';
import { MaybePromise, getDefinitePromise, isPromise } from './Promises';
import isNil from 'lodash.isnil';

// /**
//  * Structure of an input acceptable to create a BlueBaseModule
//  */
// // export type BlueBaseModuleInput<T> = MaybePromise<MaybeEsModule<T>>;
// export type BlueBaseModuleInput<T> = MaybeEsModule<MaybePromise<MaybeEsModule<T>>>;

// /**
//  * An object that maybe an instance of BlueBaseModule, or a BlueBaseModuleInput object, or neiter.
//  */
// export type MaybeBlueBaseModuleOrInput<T> = MaybeBlueBaseModule<T> | BlueBaseModuleInput<T>;

/**
 * An object that may or may not be an instance of BlueBaseModule
 */
export type MaybeBlueBaseModule<T> = BlueBaseModule<T> | T;


/**
 * 📦 BlueBaseModule
 */
export interface BlueBaseModule<T> extends Promise<T> {

	/**
	 * This is the input value. If this value is an ES module,
	 * then we store the value of `.default` property.
	 *
	 * This element may (in case of code splitting) or may not
	 * be a Promise. Also, the promise itself may or may not
	 * resolve an ES module.
	 */
	module: MaybePromise<MaybeEsModule<T>>;

	/**
	 * This flag tells if the initial input module as a promise.
	 * If it is false, then it means that the module property
	 * represents the actual module, converted from ES.
	 */
	isAsync: boolean;
}

/**
 * Creates a BlueBaseModule promise
 * @param input
 */
export function createBlueBaseModule<T>(input: MaybeBlueBaseModule<T>) {

	const module = getDefiniteModule(input);

	const promise = new Promise((resolve, reject) => {
		getDefinitePromise(module)
				.then((m: MaybeEsModule<T>) => resolve(getDefiniteModule(m)))
				.catch(reject);
	}) as BlueBaseModule<T>;

	promise.isAsync = isPromise(module) ? true : false;
	promise.module = module;

	return promise;
}

/**
 * Checks if an input object is a BlueBaseModule. Returns as is if true, otherwise,
 * wraps the input into a BlueBaseModule and returns.
 *
 * @param input Input object
 */
export function getDefiniteBlueBaseModule<T>(input: MaybeBlueBaseModule<T>): BlueBaseModule<T> {

	if (isBlueBaseModule(input)) {
		return input;
	}

	return createBlueBaseModule(input);
}

/**
 * Check if an input object is an instance of BlueBaseModule
 * @param input Input object
 */
export function isBlueBaseModule<T>(input: MaybeBlueBaseModule<T>): input is BlueBaseModule<T> {
	return isPromise(input) && !isNil(input.isAsync) && !isNil(input.module);
}
