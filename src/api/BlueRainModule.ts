import { MaybeEsModule, getDefiniteModule, isEsModule } from '../utils/modules';
import { MaybePromise, getDefinitePromise, isPromise } from '../utils/promises';

export type BlueRainModuleInput<T> = MaybeEsModule<MaybePromise<MaybeEsModule<T>>>;

// export type MaybeBlueRainModule<T> = T | BlueRainModule<T>;
export type MaybeBlueRainModule<T> = BlueRainModuleInput<T | BlueRainModule<T>>;

export function getDefiniteBlueRainModule<T>(module: MaybeBlueRainModule<T>): BlueRainModule<T> {

	if (!(module instanceof BlueRainModule)) {
		module = (new BlueRainModule(module)) as BlueRainModule<T>;
	}

	return module;
}

/**
 * BlueRain module
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

	constructor(module: BlueRainModuleInput<T> ) {

		this.module = (isEsModule(module)) ? getDefiniteModule(module) : module;

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
