import { MaybeEsModule, getDefiniteModule } from './Modules';
import { MaybePromise, getDefinitePromise, isPromise } from './Promises';

/**
 * Structure of an input acceptable to create a BlueBaseModule
 */
// export type BlueBaseModuleInput<T> = MaybePromise<MaybeEsModule<T>>;
export type BlueBaseModuleInput<T> = MaybeEsModule<MaybePromise<MaybeEsModule<T>>>;

/**
 * An object that may or may not be an instance of BlueBaseModule
 */
export type MaybeBlueBaseModule<T> = T | BlueBaseModule<T>;

/**
 * An object that maybe an instance of BlueBaseModule, or a BlueBaseModuleInput object, or neiter.
 */
export type MaybeBlueBaseModuleOrInput<T> = BlueBaseModuleInput<T> | MaybeBlueBaseModule<T>;

/**
 * Checks if an input object is a BlueBaseModule. Returns as is if true, otherwise,
 * wraps the input into a BlueBaseModule and returns.
 *
 * @param input Input object
 */
export function getDefiniteBlueBaseModule<T>(input: MaybeBlueBaseModuleOrInput<T>): BlueBaseModule<T> {

	if (isBlueBaseModule(input)) {
		return input;
	}

	return new BlueBaseModule(input) as BlueBaseModule<T>;
}

/**
 * Check if an input object is an instance of BlueBaseModule
 * @param input Input object
 */
export function isBlueBaseModule<T>(input: MaybeBlueBaseModuleOrInput<T>): input is BlueBaseModule<T> {
	return (input instanceof BlueBaseModule);
}

/**
 * 📦 BlueBase Module
 */
export class BlueBaseModule<T> {

	/**
	 * This is the input value. If this value is an ES module,
	 * then we store the value of `.default` property.
	 *
	 * This element may (in case of code splitting) or may not
	 * be a Promise. Also, the promise itself may or may not
	 * resolve an ES module.
	 */
	public module: MaybePromise<MaybeEsModule<T>>;

	/**
	 * The module is converted into promise. This promise
	 * resolves the module itself. If the module is an ES module,
	 * then the promise resolve `.default` property of th module.
	 *
	 * This means, this promise will always resolve the intended
	 * module, no matter if it was a promise or not, or an ES module
	 * or not.
	 */
	public promise: Promise<T>;

	/**
	 * This flag tells if the initial input module as a promise.
	 * If it is false, then it means that the module property
	 * represents the actual module, converted from ES.
	 */
	public isAsync: boolean = false;

	constructor(input: BlueBaseModuleInput<T>) {

		this.module = getDefiniteModule(input);

		if (isPromise(this.module)) {
			this.isAsync = true;
		}

		this.promise = new Promise((resolve, reject) => {
			getDefinitePromise(this.module)
				.then((m: MaybeEsModule<T>) => resolve(getDefiniteModule(m)))
				.catch(reject);
		});
	}
}
