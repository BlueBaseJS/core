import { createBlueBaseModule, getDefiniteBlueBaseModule } from '../BlueBaseModule';

describe('Utils', () => {

	describe('BlueBaseModule', () => {

		it('should process a CommonJS module', async () => {

			const module = createBlueBaseModule({ foo: 'bar' });

			const obj = await module;
			expect(obj.foo).toBe('bar');
		});

		it('should process an ES module', async () => {

			const module = createBlueBaseModule<{ foo: string }>({ default: { foo: 'bar' }, __esModule: true } as any);

			const obj = await module;
			expect(obj.foo).toBe('bar');
		});

		it('should process a CommonJS module in a promise', async () => {

			const module = createBlueBaseModule<{ foo: string }>(Promise.resolve({ foo: 'bar' }) as any);

			const obj = await module;
			expect(obj.foo).toBe('bar');
		});

		it('should process an ES module in a promise', async () => {

			const module =
				createBlueBaseModule<{ foo: string }>(Promise.resolve({ default: { foo: 'bar' }, __esModule: true }) as any);

			const obj = await module;
			expect(obj.foo).toBe('bar');
		});

		it('.getDefiniteBlueBaseModule method should return a BlueBaseModule object as is', async () => {
			const module = createBlueBaseModule({ foo: 'bar' });
			expect(getDefiniteBlueBaseModule(module)).toBe(module);
		});

		it('.getDefiniteBlueBaseModule method should create a BlueBaseModule object', async () => {

			const module = getDefiniteBlueBaseModule<{ foo: string }>({ foo: 'bar' });

			const obj = await module;
			expect(obj.foo).toBe('bar');
		});

	});

});