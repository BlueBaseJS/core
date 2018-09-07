import { BlueRainModule } from '../BlueRainModule';

describe('API', () => {

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

	});

});