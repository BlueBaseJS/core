import { BlueRainModule, getDefiniteBlueRainModule } from '../BlueRainModule';

describe('Utils', () => {

	describe('BlueRainModule', () => {

		it('should process a CommonJS module', async () => {

			const module = new BlueRainModule({ foo: 'bar' });

			const obj = await module.promise;
			expect(obj.foo).toBe('bar');
		});

		it('should process an ES module', async () => {

			const module = new BlueRainModule({ default: { foo: 'bar' }, __esModule: true });

			const obj = await module.promise;
			expect(obj.foo).toBe('bar');
		});

		it('should process a CommonJS module in a promise', async () => {

			const module = new BlueRainModule(Promise.resolve({ foo: 'bar' }));

			const obj = await module.promise;
			expect(obj.foo).toBe('bar');
		});

		it('should process an ES module in a promise', async () => {

			const module = new BlueRainModule(Promise.resolve({ default: { foo: 'bar' }, __esModule: true }));

			const obj = await module.promise;
			expect(obj.foo).toBe('bar');
		});


		it('.getDefiniteBlueRainModule method should return a BlueRainModule object as is', async () => {
			const module = new BlueRainModule({ foo: 'bar' });
			expect(getDefiniteBlueRainModule(module)).toBe(module);
		});

		it('.getDefiniteBlueRainModule method should create a BlueRainModule object', async () => {

			const module = getDefiniteBlueRainModule({ foo: 'bar' });

			const obj = await module.promise;
			expect(obj.foo).toBe('bar');
		});

	});

});