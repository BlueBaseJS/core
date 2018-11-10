import { isHook, isHookInput, parseHookCollectionItem } from '../helpers';
import { Hook } from '../../../models/Hook';

// const DummyPlugin = createPlugin({ pluginName: 'DummyPlugin' });

export const SingleListener = {
	handler: (val: number) => val + 5,
	name: 'add.five',
};

export const MultipleListeners = [{
	handler: (val: number) => val + 10,
	name: 'add.ten',
}, {
	handler: (val: number) => val * 2,
	name: 'multiply.by.two',
}];

export const SingleHookHandler = (val: number) => val + 10;

export const SingleListenerInESModule = {
	__esModule: true,
	default: {
		handler: (val: number) => val + 2,
		name: 'add.two',
	},
};

export const SingleListenerInPromisedESModule = Promise.resolve({
	__esModule: true,
	default: {
		handler: (val: number) => val + 6,
		name: 'add.six',
	}
});


describe('PluginRegistry', () => {

	describe('helpers: isHook', () => {

		it('should return true when a hook is passed to isHook method', async () => {
			const hook = new Hook({
				handler: () => { return; },
				name: 'foo',
			});
			expect(isHook(hook)).toBe(true);
		});

		it('should return false when a string is passed to isHook method', async () => {
			expect(isHook('foo')).toBe(false);
		});

	});

	describe('helpers: isHookInput', () => {

		it('should return true when a hook is passed to the function', async () => {
			const hook = new Hook({
				handler: () => { return; },
				name: 'foo',
			});
			expect(isHookInput(hook)).toBe(true);
		});

		it('should return true when an object is passed with handler function', async () => {
			const hook = { handler: () => { return; }, };
			expect(isHookInput(hook)).toBe(true);
		});

		it('should return false when an object without handler is passed to the function', async () => {
			expect(isHookInput({ name: 'foo' })).toBe(false);
		});

		it('should return false when a string is passed to the function', async () => {
			expect(isHookInput('foo')).toBe(false);
		});

	});


	describe('helpers: parseHookCollectionItem', () => {

		describe('single listener objects', () => {

			it('should accept a listener and return it in an array', async () => {
				const listeners = await parseHookCollectionItem(SingleListener, 'some-hook');

				expect(listeners).toHaveLength(1);
				expect(listeners[0].name).toBe('add.five');
			});

			it('should accept a listener in an ES Module and return it in an array', async () => {
				// const listeners = await parseHookCollectionItem2(SingleListenerInESModule, 'some-hook');
				const listeners = await parseHookCollectionItem([SingleListenerInESModule], 'some-hook');

				expect(listeners).toHaveLength(1);
				expect(listeners[0].name).toBe('add.two');
			});

			it('should accept a listener in a Promised ES Module and return it in an array', async () => {
				const listeners = await parseHookCollectionItem(SingleListenerInPromisedESModule, 'some-hook');

				expect(listeners).toHaveLength(1);
				expect(listeners[0].name).toBe('add.six');
			});

			it('should accept an instance of Hook class and return it in an array', async () => {
				const hook = new Hook({
					handler: () => { return; },
					name: 'foo',
				});

				const listeners = await parseHookCollectionItem(hook, 'some-hook');

				expect(listeners).toHaveLength(1);
				expect(listeners[0].name).toBe('foo');
			});

			it('should throw when an unrecognized hook format is passed', async () => {

				let message = false;

				try {
					await parseHookCollectionItem('foo' as any, 'some-hook');
				} catch (e) {
					message = e.message;
				}

				expect(message).toBe('Could not create Hook. Reason: Unrecognized hook format.');
			});

		});

		describe('multiple listener objects', () => {

			it('should accept two listeners and return that in an array', async () => {
				const listeners = await parseHookCollectionItem(MultipleListeners, 'some-hook');

				expect(listeners).toHaveLength(2);
				expect(listeners[0].name).toBe('add.ten');
				expect(listeners[1].name).toBe('multiply.by.two');
			});

			it('should accept two listeners from imported modules and return that in an array', async () => {
				const listeners = await parseHookCollectionItem([
					SingleListenerInESModule,
					SingleListenerInPromisedESModule,
				], 'some-hook');

				expect(listeners).toHaveLength(2);
				expect(listeners[0].name).toBe('add.two');
				expect(listeners[1].name).toBe('add.six');
			});

		});

		describe('single handler function', () => {

			it('should accept a handler function and return it as a listener in an array', async () => {
				const listeners = await parseHookCollectionItem(SingleHookHandler, 'some-hook');

				expect(listeners).toHaveLength(1);
				expect(listeners[0].name).toBe('unknown.some-hook.0');
			});

			it('should accept a handler function in an ES module and return it as a listener in an array', async () => {
				const listeners = await parseHookCollectionItem({ __esModule: true, default: SingleHookHandler }, 'some-hook');

				expect(listeners).toHaveLength(1);
				expect(listeners[0].name).toBe('unknown.some-hook.0');
			});

			it('should accept a handler function in a Promised ES module and return it as a listener in an array', async () => {
				const listeners = await parseHookCollectionItem(
					Promise.resolve({ __esModule: true, default: SingleHookHandler }),
					'some-hook');

				expect(listeners).toHaveLength(1);
				expect(listeners[0].name).toBe('unknown.some-hook.0');
			});

		});

		describe('mixed items (listener and handler)', () => {

			it('should accept mixed items and return them in an array of listeners', async () => {
				const listeners = await parseHookCollectionItem([SingleListener, SingleHookHandler], 'some-hook');

				expect(listeners).toHaveLength(2);
				expect(listeners[0].name).toBe('add.five');
				expect(listeners[1].name).toBe('unknown.some-hook.1');
			});

			it('should accept mixed items (including modules) and return them in an array of listeners', async () => {
				const listeners = await parseHookCollectionItem([
					SingleListener,
					SingleListenerInESModule,
					SingleHookHandler,
					SingleListenerInPromisedESModule
				], 'some-hook');

				expect(listeners).toHaveLength(4);
				expect(listeners[0].name).toBe('add.five');
				expect(listeners[1].name).toBe('add.two');
				expect(listeners[2].name).toBe('unknown.some-hook.2');
				expect(listeners[3].name).toBe('add.six');
			});

		});

	});

});
