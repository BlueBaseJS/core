import {
	MultipleListeners,
	SingleHookHandler,
	SingleListener,
	SingleListenerInESModule,
	SingleListenerInPromisedESModule,
} from './PluginConstants';
import { createPlugin } from '../Plugin';
import { parsePluginHook } from '../hook.helpers';

const DummyPlugin = createPlugin({ pluginName: 'DummyPlugin' });

describe('PluginRegistry', () => {

	describe('parsePluginHook', () => {

		describe('single listener objects', () => {

			it('should accept a listener and return it in an array', async () => {
				const listeners = await parsePluginHook(SingleListener, 'some-hook', DummyPlugin);

				expect(listeners).toHaveLength(1);
				expect(listeners[0].name).toBe('add.five');
			});

			it('should accept a listener in an ES Module and return it in an array', async () => {
				// const listeners = await parsePluginHook2(SingleListenerInESModule, 'some-hook', DummyPlugin);
				const listeners = await parsePluginHook([SingleListenerInESModule], 'some-hook', DummyPlugin);

				expect(listeners).toHaveLength(1);
				expect(listeners[0].name).toBe('add.two');
			});

			it('should accept a listener in a Promised ES Module and return it in an array', async () => {
				const listeners = await parsePluginHook(SingleListenerInPromisedESModule, 'some-hook', DummyPlugin);

				expect(listeners).toHaveLength(1);
				expect(listeners[0].name).toBe('add.six');
			});

		});

		describe('multiple listener objects', () => {

			it('should accept two listeners and return that in an array', async () => {
				const listeners = await parsePluginHook(MultipleListeners, 'some-hook', DummyPlugin);

				expect(listeners).toHaveLength(2);
				expect(listeners[0].name).toBe('add.ten');
				expect(listeners[1].name).toBe('multiply.by.two');
			});

			it('should accept two listeners from imported modules and return that in an array', async () => {
				const listeners = await parsePluginHook([
					SingleListenerInESModule,
					SingleListenerInPromisedESModule,
				], 'some-hook', DummyPlugin);

				expect(listeners).toHaveLength(2);
				expect(listeners[0].name).toBe('add.two');
				expect(listeners[1].name).toBe('add.six');
			});

		});

		describe('single handler function', () => {

			it('should accept a handler function and return it as a listener in an array', async () => {
				const listeners = await parsePluginHook(SingleHookHandler, 'some-hook', DummyPlugin);

				expect(listeners).toHaveLength(1);
				expect(listeners[0].name).toBe('dummy-plugin.some-hook.0');
			});

			it('should accept a handler function in an ES module and return it as a listener in an array', async () => {
				const listeners = await parsePluginHook({ __esModule: true, default: SingleHookHandler }, 'some-hook', DummyPlugin);

				expect(listeners).toHaveLength(1);
				expect(listeners[0].name).toBe('dummy-plugin.some-hook.0');
			});

			it('should accept a handler function in a Promised ES module and return it as a listener in an array', async () => {
				const listeners = await parsePluginHook(
					Promise.resolve({ __esModule: true, default: SingleHookHandler }),
					'some-hook',
					DummyPlugin);

				expect(listeners).toHaveLength(1);
				expect(listeners[0].name).toBe('dummy-plugin.some-hook.0');
			});

		});

		describe('mixed items (listener and handler)', () => {

			it('should accept mixed items and return them in an array of listeners', async () => {
				const listeners = await parsePluginHook([SingleListener, SingleHookHandler], 'some-hook', DummyPlugin);

				expect(listeners).toHaveLength(2);
				expect(listeners[0].name).toBe('add.five');
				expect(listeners[1].name).toBe('dummy-plugin.some-hook.1');
			});

			it('should accept mixed items (including modules) and return them in an array of listeners', async () => {
				const listeners = await parsePluginHook([
					SingleListener,
					SingleListenerInESModule,
					SingleHookHandler,
					SingleListenerInPromisedESModule
				], 'some-hook', DummyPlugin);

				expect(listeners).toHaveLength(4);
				expect(listeners[0].name).toBe('add.five');
				expect(listeners[1].name).toBe('add.two');
				expect(listeners[2].name).toBe('dummy-plugin.some-hook.2');
				expect(listeners[3].name).toBe('add.six');
			});

		});

	});

});
