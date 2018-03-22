import { BlueRain, Debugger } from '../index';
import { EsModule, MaybeEsModule } from '../typings';
import MapRegistry from './MapRegistry';
import isNil from 'lodash.isnil';
import kebabCase from 'lodash.kebabcase';

/**
 * All system debuggers are stored in this registry
 * @property {Map<string, Debugger>} data Storage Map of all debuggers
 */
export default class DebuggerRegistry extends MapRegistry<Debugger> {
	// data: Map<string, Debugger>;
	BR: BlueRain;

	constructor(ctx: BlueRain) {
		super('DebuggerRegistry');
		this.BR = ctx;
	}

	/**
	 * Register an Debugger
	 * @param {Debugger} debugger The BlueRain debugger to register
	 */
	add(_debugger: MaybeEsModule<Debugger>): void;
	add(key: string, _debugger: MaybeEsModule<Debugger>): void;
	add(key: string | MaybeEsModule<Debugger>, _debugger?: MaybeEsModule<Debugger>) {
		const { key: k, _debugger: a } = getKeyAndItem(key, _debugger);
		super.add(k, a);
	}

	/**
	 * Replace an item in the Registry.
	 *
	 * @param {string} key The key of the item
	 * @param {any} item  The item to add
	 */
	set(_debugger: MaybeEsModule<Debugger>): void;
	set(key: string, _debugger: MaybeEsModule<Debugger>): void;
	set(key: string | MaybeEsModule<Debugger>, _debugger?: MaybeEsModule<Debugger>) {
		const { key: k, _debugger: a } = getKeyAndItem(key, _debugger);
		this.data = this.data.set(k, a);
	}

	/**
	 * Register many debuggers at once
	 * @param {Array<Debugger>} debuggers The BlueRain debuggers to register
	 */
	registerMany(debuggers: Array<MaybeEsModule<Debugger>> | any) {
		debuggers = debuggers || [];

		if (!Array.isArray(debuggers)) {
			throw new Error(
				'Loggers parameter while registering via "registerMany" method must be an array'
			);
		}

		debuggers.forEach(_debugger => this.set(_debugger));
	}

	/**
	 * Initialize all the registered debuggers
	 */
	initializeAll() {
		this.data.forEach(_debugger => {
			if (!_debugger) {
				return;
			}

			// If the debugger has an initialize method, call it
			if (_debugger.initialize) {
				const config = this.BR.Configs.get(`debuggers.${_debugger.slug}`);
				_debugger.config = config;
				_debugger.initialize(config, this.BR);
			}
		});
	}
	/**
	 * @param {string} key
	 * @param {...any[]} supportingData
	 * @memberof DebuggerRegistry
	 */
	log(key: string, ...supportingData: any[]) {
		this.data.forEach(_debugger => {
			if (!_debugger) {
				return;
			}

			if (_debugger.log) {
				_debugger.log(key, ...supportingData);
			}
		});
	}
}

/**
 * Takes an debugger, adds necessary fields and returns the processed debugger with a key
 * @param key
 * @param debugger
 */
const getKeyAndItem = (
	key: string | MaybeEsModule<Debugger>,
	_debugger?: MaybeEsModule<Debugger>
): { key: string; _debugger: Debugger } => {
	if (typeof key !== 'string' && !isNil(key)) {
		_debugger = key as Debugger;
		key = '';
	}

	if (!_debugger) {
		throw new Error('No debugger provided');
	}

	// ES modules
	_debugger = (_debugger as EsModule<Debugger>).default
		? (_debugger as EsModule<Debugger>).default
		: _debugger;

	// Casting, to remove possiblity of undefined value is TS.
	_debugger = _debugger as Debugger;

	if (!_debugger.debuggerName) {
		throw new Error('Debugger name not provided.');
	}

	const slug = kebabCase(_debugger.slug ? _debugger.slug : _debugger.debuggerName);

	_debugger.slug = slug;

	const strKey = key && typeof key === 'string' ? key : slug;
	return { key: strKey, _debugger };
};
