import { BlueBaseModule, getDefiniteBlueBaseModule } from '../BlueBaseModule';

describe.only('Utils', () => {

	describe('BlueBaseModule', () => {

		it('should process a CommonJS module', async () => {

			const module = new BlueBaseModule({ foo: 'bar' });

			const obj = await module.promise;
			expect(obj.foo).toBe('bar');
		});

		it('should process an ES module', async () => {

			const module = new BlueBaseModule({ default: { foo: 'bar' }, __esModule: true } as any);

			const obj = await module.promise;
			expect(obj.foo).toBe('bar');
		});

		it('should process a CommonJS module in a promise', async () => {

			const module = new BlueBaseModule(Promise.resolve({ foo: 'bar' }));

			const obj = await module.promise;
			expect(obj.foo).toBe('bar');
		});

		it('should process an ES module in a promise', async () => {

			const module = new BlueBaseModule(Promise.resolve({ default: { foo: 'bar' }, __esModule: true }) as any);

			const obj = await module.promise;
			expect(obj.foo).toBe('bar');
		});


		it('.getDefiniteBlueBaseModule method should return a BlueBaseModule object as is', async () => {
			const module = new BlueBaseModule({ foo: 'bar' });
			expect(getDefiniteBlueBaseModule(module)).toBe(module);
		});

		it('.getDefiniteBlueBaseModule method should create a BlueBaseModule object', async () => {

			const module = getDefiniteBlueBaseModule({ foo: 'bar' });

			const obj = await module.promise;
			expect(obj.foo).toBe('bar');
		});

	});

});