import { DEFAULT_PRIORITY, HookListener, HookRegistry } from '../HookRegistry';
import { BlueRain } from '../../BlueRain';

const BR = new BlueRain();

describe('Hook Registry', () => {

	describe('.register method', () => {

		it('should register listener', () => {

			const Hooks = new HookRegistry(BR);
			Hooks.register('hook1', 'listener1', () => 'foo1');
			const hooks = Hooks.get('hook1') as HookListener[];

			expect(hooks.length).toBe(1);
			expect(hooks[0].name).toBe('listener1');
		});

		it('should throw an error if duplicate listener is registered', () => {

			const Hooks = new HookRegistry(BR);
			Hooks.register('hook1', 'listener1', () => 'foo1');

			expect(() => Hooks.register('hook1', 'listener1', () => 'foo2')).toThrowError();
		});

		it('should register listener mulitple listeners', () => {

			const Hooks = new HookRegistry(BR);
			Hooks.register('hook1', 'listener1', () => 'foo1');
			Hooks.register('hook1', 'listener2', () => 'foo2');
			const hooks = Hooks.get('hook1') as HookListener[];

			expect(hooks.length).toBe(2);
			expect(hooks[1].name).toBe('listener2');
		});

		it('should register listener with given priority', () => {

			const Hooks = new HookRegistry(BR);
			Hooks.register('hook1', 'listener1', () => 'foo1', 5);
			const hooks = Hooks.get('hook1') as HookListener[];

			expect(hooks[0].priority).toBe(5);
		});

		it('should register listener with default priority', () => {

			const Hooks = new HookRegistry(BR);
			Hooks.register('hook1', 'listener1', () => 'foo1');
			const hooks = Hooks.get('hook1') as HookListener[];

			expect(hooks[0].priority).toBe(DEFAULT_PRIORITY);
		});

	});


	describe('.unregister method', () => {

		it('should unregister listener', () => {

			const Hooks = new HookRegistry(BR);
			Hooks.register('hook1', 'listener1', () => 'foo1');
			Hooks.register('hook1', 'listener2', () => 'foo2');
			Hooks.register('hook1', 'listener3', () => 'foo3');
			Hooks.unregister('hook1', 'listener2');

			const hooks = Hooks.get('hook1') as HookListener[];
			expect(hooks.length).toBe(2);
			expect(hooks[0].name).toBe('listener1');
			expect(hooks[1].name).toBe('listener3');
		});

		it('should throw an error for unknown hooks', () => {

			const Hooks = new HookRegistry(BR);
			expect(() => Hooks.unregister('hook1', 'listener1')).toThrowError();
		});

		it('should throw an error if listener is not registered', () => {

			const Hooks = new HookRegistry(BR);
			Hooks.register('hook1', 'listener1', () => 'foo1');

			expect(() => Hooks.unregister('hook1', 'listener2')).toThrowError();
		});

	});

	describe('.run method', () => {

		it('should run a hook with no listeners', async () => {

			const Hooks = new HookRegistry(BR);

			const value = await Hooks.run('hook1', 20);
			expect(value).toBe(20);
		});

		it('should run a hook with a single listener', async () => {

			const Hooks = new HookRegistry(BR);
			Hooks.register('hook1', 'listener1', (val) => val);

			const value = await Hooks.run('hook1', 20);
			expect(value).toBe(20);
		});


		it('should run a hook with a multiple listeners', async () => {

			const Hooks = new HookRegistry(BR);
			Hooks.register('hook1', 'return-self', (val) => val);
			Hooks.register('hook1', 'add-five', (val) => val + 5);
			Hooks.register('hook1', 'add-ten', (val) => val + 10);

			const value = await Hooks.run('hook1', 2);
			expect(value).toBe(17);
		});


		it('should run a hook with proper priorities', async () => {

			const Hooks = new HookRegistry(BR);
			Hooks.register('hook1', 'right', async (val) => `${val} right!`, 3);
			Hooks.register('hook1', 'priorities', (val) => `${val} priorities`, 1);
			Hooks.register('hook1', 'my', async (val) => `${val}, my`, 0);
			Hooks.register('hook1', 'are', (val) => `${val} are`, 2);

			const value = await Hooks.run('hook1', 'Hello ART');
			expect(value).toBe('Hello ART, my priorities are right!');
		});


		it('should run a hook even if a listener doesnt return any value', async () => {

			const Hooks = new HookRegistry(BR);
			Hooks.register('hook1', 'return-self', (val) => val);
			Hooks.register('hook1', 'do-nothing', () => { return; });
			Hooks.register('hook1', 'add-five', (val) => val + 5);

			const value = await Hooks.run('hook1', 2);
			expect(value).toBe(7);
		});


		it('should run a hook even if a listener doesnt return a promise', async () => {

			const Hooks = new HookRegistry(BR);
			Hooks.register('hook1', 'return-self', async (val) => val);
			Hooks.register('hook1', 'add-five', (val) => val + 5);
			Hooks.register('hook1', 'add-ten', async (val) => val + 10);

			const value = await Hooks.run('hook1', 2);
			expect(value).toBe(17);
		});


	});
});