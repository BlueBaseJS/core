// declare var global: any;

import { DEFAULT_HOOK_PRIORITY, HookNestedCollection, FilterRegistry } from '../FilterRegistry';
import { BlueBase } from '../../BlueBase';

describe('FilterRegistry', () => {
	describe('.register method', () => {
		it('should register listener', async () => {
			const BB = new BlueBase();
			const Filters = new FilterRegistry(BB);

			await Filters.register('listener1', { event: 'hook1', value: () => 'foo1' });
			const hook = Filters.get('listener1');

			expect((hook as any).event).toBe('hook1');
		});

		it('should register listener with auto generated ID', async () => {
			const BB = new BlueBase();
			const Filters = new FilterRegistry(BB);

			const key = await Filters.register({ event: 'hook1', value: () => 'foo1' });
			const hook = Filters.get(key);

			expect((hook as any).event).toBe('hook1');
		});

		it('should override if duplicate listener is registered', async () => {
			const BB = new BlueBase();
			const Filters = new FilterRegistry(BB);

			await Filters.register('listener1', { event: 'hook1', value: () => 'foo1' });
			await Filters.register('listener1', { event: 'hook1', value: () => 'foo2' });
			const hook = await Filters.getValue('listener1');

			expect((hook as any)()).toBe('foo2');
		});

		it('should register listener with given priority', async () => {
			const BB = new BlueBase();
			const Filters = new FilterRegistry(BB);

			await Filters.register('listener1', { event: 'hook1', value: () => 'foo1', priority: 5 });
			const hook = Filters.get('listener1');

			expect((hook as any).event).toBe('hook1');
			expect((hook as any).priority).toBe(5);
		});

		it('should register listener with default priority', async () => {
			const BB = new BlueBase();
			const Filters = new FilterRegistry(BB);

			await Filters.register('listener1', { event: 'hook1', value: () => 'foo1' });
			const hook = Filters.get('listener1');

			expect((hook as any).event).toBe('hook1');
			expect((hook as any).priority).toBe(DEFAULT_HOOK_PRIORITY);
		});
	});

	describe('.registerNestedCollection method', () => {
		it('should register hooks', async () => {
			const BB = new BlueBase();
			const Filters = new FilterRegistry(BB);

			const collection: HookNestedCollection = {
				hook1: [{ key: 'add-fifteen', value: (val: number) => val + 15 }, (val: number) => val],
				hook2: { key: 'add-five', value: (val: number) => val + 5 },
				hook3: (val: number) => val + 10,
			};

			await Filters.registerNestedCollection(collection);

			expect(Filters.size()).toBe(4);

			const valHook1 = await Filters.run('hook1', 5);
			expect(valHook1).toBe(20);

			const valHook2 = await Filters.run('hook2', 5);
			expect(valHook2).toBe(10);

			const valHook3 = await Filters.run('hook3', 5);
			expect(valHook3).toBe(15);
		});

		it('should register promised hooks', async () => {
			const BB = new BlueBase();
			const Filters = new FilterRegistry(BB);

			const collection: HookNestedCollection = {
				hook1: [
					Promise.resolve({ key: 'add-fifteen', value: (val: number) => val + 15 }),
					Promise.resolve((val: number) => val),
				],
				hook2: Promise.resolve({ key: 'add-five', value: (val: number) => val + 5 }),
				hook3: Promise.resolve((val: number) => val + 10),
			};

			await Filters.registerNestedCollection(collection);

			expect(Filters.size()).toBe(4);

			const valHook1 = await Filters.run('hook1', 5);
			expect(valHook1).toBe(20);

			const valHook2 = await Filters.run('hook2', 5);
			expect(valHook2).toBe(10);

			const valHook3 = await Filters.run('hook3', 5);
			expect(valHook3).toBe(15);
		});

		it('should register hooks in a thunk', async () => {
			const BB = new BlueBase();
			const Filters = new FilterRegistry(BB);

			const collection: HookNestedCollection = () => ({
				hook1: [{ key: 'add-fifteen', value: (val: number) => val + 15 }, (val: number) => val],
				hook2: { key: 'add-five', value: (val: number) => val + 5 },
				hook3: (val: number) => val + 10,
			});

			await Filters.registerNestedCollection(collection);

			expect(Filters.size()).toBe(4);

			const valHook1 = await Filters.run('hook1', 5);
			expect(valHook1).toBe(20);

			const valHook2 = await Filters.run('hook2', 5);
			expect(valHook2).toBe(10);

			const valHook3 = await Filters.run('hook3', 5);
			expect(valHook3).toBe(15);
		});

		it('should throw an error for unknown hook type', async () => {
			const BB = new BlueBase();
			const Filters = new FilterRegistry(BB);

			const collection: HookNestedCollection = () => ({
				hook1: [{ key: 'add-fifteen' }],
			});

			try {
				await Filters.registerNestedCollection(collection);
			} catch (error) {
				expect(error.message).toBe('Could not register Hook. Reason: Input is not a hook item.');
			}
		});

		it('should not do anything if no param given', async () => {
			const BB = new BlueBase();
			const Filters = new FilterRegistry(BB);

			await Filters.registerNestedCollection();
			expect(Filters.size()).toBe(0);
		});
	});

	describe('.findAllByEvent method', () => {
		it('should register listener mulitple listeners', async () => {
			const BB = new BlueBase();
			const Filters = new FilterRegistry(BB);

			await Filters.register('listener1', { event: 'hook1', value: () => 'foo1' });
			await Filters.register('listener2', { event: 'hook2', value: () => 'foo2' });
			await Filters.register('listener3', { event: 'hook1', value: () => 'foo3' });

			const hooks = Filters.findAllByEvent('hook1');

			const fn = await hooks.listener3.value;

			expect(Object.keys(hooks).length).toBe(2);
			expect((fn as any)()).toBe('foo3');
		});
	});

	describe('.run method', () => {
		it('should run a hook with no listeners', async () => {
			const BB = new BlueBase();
			const Filters = new FilterRegistry(BB);

			const value = await Filters.run('hook1', 20);
			expect(value).toBe(20);
		});

		it('should run a hook with a single listener', async () => {
			const BB = new BlueBase();
			const Filters = new FilterRegistry(BB);

			await Filters.register('listener1', { event: 'hook1', value: (val: number) => val + 5 });

			const value = await Filters.run('hook1', 20);
			expect(value).toBe(25);
		});

		it('should run a hook with a multiple listeners', async () => {
			const BB = new BlueBase();
			const Filters = new FilterRegistry(BB);
			await Filters.register('return-self', { event: 'hook1', value: (val: number) => val });
			await Filters.register('add-five', { event: 'hook1', value: (val: number) => val + 5 });
			await Filters.register('add-ten', { event: 'hook1', value: (val: number) => val + 10 });

			const value = await Filters.run('hook1', 2);
			expect(value).toBe(17);
		});

		it('should run a hook with a handler imported from ES module', async () => {
			const BB = new BlueBase();
			const Filters = new FilterRegistry(BB);

			await Filters.register('add-five', {
				event: 'hook1',
				value: {
					__esModule: true,
					default: (val: number) => val + 5,
				} as any,
			});

			const value = await Filters.run('hook1', 30);
			expect(value).toBe(35);
		});

		it('should run a hook with a handler imported from Promised ES module', async () => {
			const BB = new BlueBase();
			const Filters = new FilterRegistry(BB);

			await Filters.register('add-five', {
				event: 'hook1',
				value: Promise.resolve({
					__esModule: true,
					default: (val: number) => val - 5,
				}) as any,
			});

			const value = await Filters.run('hook1', 40);
			expect(value).toBe(35);
		});

		it('should run a hook with a handler imported from a Promise', async () => {
			const BB = new BlueBase();
			const Filters = new FilterRegistry(BB);

			await Filters.register('add-five', {
				event: 'hook1',
				value: Promise.resolve((val: number) => val * 2) as any,
			});

			const value = await Filters.run('hook1', 40);
			expect(value).toBe(80);
		});

		it('should run a hook with proper priorities', async () => {
			const BB = new BlueBase();
			const Filters = new FilterRegistry(BB);

			await Filters.register('right', {
				event: 'hook1',
				priority: 3,
				value: async (val: string) => `${val} right!`,
			});
			await Filters.register('priorities', {
				event: 'hook1',
				priority: 1,
				value: (val: string) => `${val} priorities`,
			});
			await Filters.register('my', {
				event: 'hook1',
				priority: 0,
				value: async (val: string) => `${val}, my`,
			});
			await Filters.register('are', {
				event: 'hook1',
				priority: 2,
				value: (val: string) => `${val} are`,
			});

			const value = await Filters.run('hook1', 'Hello ART');
			expect(value).toBe('Hello ART, my priorities are right!');
		});

		it('should run a hook even if a listener doesnt return any value', async () => {
			const BB = new BlueBase();
			const Filters = new FilterRegistry(BB);
			await Filters.register('return-self', { event: 'hook1', value: (val: number) => val });
			await Filters.register('do-nothing', {
				event: 'hook1',
				value: () => {
					return;
				},
			});
			await Filters.register('add-five', { event: 'hook1', value: (val: number) => val + 5 });

			const value = await Filters.run('hook1', 2);
			expect(value).toBe(7);
		});

		it('should run a hook even if a listener doesnt return a promise', async () => {
			const BB = new BlueBase();
			const Filters = new FilterRegistry(BB);
			await Filters.register('return-self', { event: 'hook1', value: async (val: number) => val });
			await Filters.register('add-five', { event: 'hook1', value: (val: number) => val + 5 });
			await Filters.register('add-ten', { event: 'hook1', value: async (val: number) => val + 10 });

			const value = await Filters.run('hook1', 2);
			expect(value).toBe(17);
		});

		it('should throw an error if handler is not a function', async () => {
			const BB = new BlueBase();
			const Filters = new FilterRegistry(BB);
			await Filters.register('listener1', { event: 'hook1', value: 'foo1' as any });

			let message = false;

			try {
				await Filters.run('hook1', 2);
			} catch (e) {
				message = e.message;
			}

			expect(message).toBeTruthy();
		});
	});

	describe('.isInputValue method', () => {
		it('should return true if input is a function', async () => {
			const BB = new BlueBase();
			const Plugins = new FilterRegistry(BB);

			expect(
				(Plugins as any).isInputValue(() => {
					return;
				})
			).toBe(true);
		});

		it('should return false if input is an object', async () => {
			const BB = new BlueBase();
			const Plugins = new FilterRegistry(BB);

			expect((Plugins as any).isInputValue({})).toBe(false);
		});

		it('should return false if input is a string', async () => {
			const BB = new BlueBase();
			const Plugins = new FilterRegistry(BB);

			expect((Plugins as any).isInputValue('foo')).toBe(false);
		});
	});
});
