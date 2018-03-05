import BR, { Debugger } from '../../src/index';
import { Map } from 'immutable';

describe('Debugger registry tests', () => {
	describe('register debugger', () => {
		it('slug should be hello-world-debugger', () => {
			class HelloWorldDebugger extends Debugger {
				static debuggerName = 'HelloWorldDebugger';
				initialize() {}
			}

			BR.Debug.add(HelloWorldDebugger);
			expect(BR.Debug.data.has('hello-world-debugger')).toEqual(true);
		});

		it('should throw error b/c name is null', () => {
			class NewDebugger extends Debugger {
				static debuggerName = 'NewDebugger';
				initialize() {}
			}
			expect(() => BR.Debug.add(NewDebugger, 'dummy')).not.toThrow();
		});

		it('slug Create other recognized static properties', () => {
			const _debugger = BR.Debug.data.get('hello-world-debugger');
			expect(_debugger.slug).toEqual('hello-world-debugger');
			expect(_debugger.debuggerName).toEqual('HelloWorldDebugger');
		});
	});
	// Debugger without extending BlueRain's Debugger class
	describe('register debugger without extending BlueRain Debugger class', () => {
		it('With debuggerName, Debugger should be created', () => {
			BR.Debug.data = Map();
			class HelloDebugger {
				static debuggerName = 'HelloDebugger';
				initialize() {}
			}
			BR.Debug.add(HelloDebugger);
			expect(BR.Debug.data.size).toEqual(1);
		});

		it('Without log method', () => {
			expect(BR.Debug.get('hello-debugger').log).toBeUndefined();
		});

		it('Without adding valid debugger', () => {
			expect(() => BR.Debug.add(null)).toThrow('No debugger provided');
			//expect().toBeUndefined();
		});

		it('Without debuggerName, Debugger should throw error', () => {
			class HelloDebugger {
				initialize() {}
			}
			expect(() => BR.Debug.add(HelloDebugger)).toThrow('Debugger name not provided.');
		});
	});

	describe('get Debugger', () => {
		it('should throw error b/c name is undefined', () => {
			expect(() => BR.Debug.get(undefined)).toThrow();
		});
		it('should throw error b/c name is null', () => {
			expect(() => BR.Debug.get(null)).toThrow();
		});
		it('should be undfined b/c debugger is not registered.', () => {
			expect(BR.Debug.get('abc')).toBeUndefined();
		});
		it('should have Debugger', () => {
			expect(BR.Debug.get('hello-debugger')).toBeDefined();
		});
	});
	describe('remove Debugger', () => {
		it('should throw error b/c name is undefined', () => {
			expect(() => BR.Debug.remove(undefined)).toThrow();
		});
		it('should throw error b/c name is null', () => {
			expect(() => BR.Debug.remove(null)).toThrow();
		});
		it('should throw error b/c debugger is not registered.', () => {
			expect(() => BR.Plugins.remove('abc')).toThrow();
		});
		it('should have debugger', () => {
			BR.Debug.remove('hello-debugger');
			expect(BR.Debug.get('hello-debugger')).toBeUndefined();
		});
	});
	describe('register many a', () => {
		it('should throw error b/c Debug are not array', () => {
			expect(() => BR.Debug.registerMany({})).toThrow();
		});
		it('should throw error b/c debugger is string', () => {
			expect(() => BR.Debug.registerMany('string')).toThrow();
		});

		it('should have hello world plugin', () => {
			class SentryDebugger extends Debugger {
				static debuggerName = 'SentryLogger';
				static slug = 'with-slug-2';
				initialize() {}
				log() {}
			}
			class ConsoleDebugger extends Debugger {
				static debuggerName = 'ConsoleLogger';
				initialize() {}
				log() {}
			}
			BR.Debug.registerMany([SentryDebugger, ConsoleDebugger]);
			expect(BR.Debug.data.size).toEqual(2);
		});

		it('Without debugger, Debugger should throw error', () => {
			BR.Debug.clear();
			BR.Debug.data.forEach(element => {
				expect(element).toBeUndefined();
			});
		});
	});
});
