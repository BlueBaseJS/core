import { MaybeEsModule, getDefiniteModule, isEsModule } from '../utils/Modules';
import { MaybePromise, getDefinitePromise, isPromise } from '../utils/Promises';

/**
 * Structure of an input acceptable to create a BlueRainModule
 */
// export type BlueRainModuleInput<T> = MaybePromise<MaybeEsModule<T>>;
export type BlueRainModuleInput<T> = MaybeEsModule<MaybePromise<MaybeEsModule<T>>>;

/**
 * An object that may or may not be an instance of BlueRainModule
 */
export type MaybeBlueRainModule<T> = T | BlueRainModule<T>;

/**
 * An object that maybe an instance of BlueRainModule, or a BlueRainModuleInput object, or neiter.
 */
export type MaybeBlueRainModuleOrInput<T> = BlueRainModuleInput<T> | MaybeBlueRainModule<T>;

/**
 * Checks if an input object is a BlueRainModule. Returns as is if true, otherwise,
 * wraps the input into a BlueRainModule and returns.
 *
 * @param input Input object
 */
export function getDefiniteBlueRainModule<T>(input: MaybeBlueRainModuleOrInput<T>): BlueRainModule<T> {

	if (isBlueRainModule(input)) {
		return input;
	}

	return new BlueRainModule(input) as BlueRainModule<T>;
}

/**
 * Check if an input object is an instance of BlueRainModule
 * @param input Input object
 */
export function isBlueRainModule<T>(input: MaybeBlueRainModuleOrInput<T>): input is BlueRainModule<T> {
	return (input instanceof BlueRainModule);
}

/**
 * 📦 BlueRain Module
 */
export class BlueRainModule<T> {

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

	constructor(input: BlueRainModuleInput<T> ) {

		this.module = (isEsModule(input)) ? getDefiniteModule(input) : input;

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
