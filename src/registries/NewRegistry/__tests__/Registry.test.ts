import { BlueBase } from '../../../BlueBase';
import { Registry } from '../Registry';

// import exportedFunctions from '../../../utils/Misc';
// const { makeId } = exportedFunctions;

// // tslint:disable-next-line
// let { makeId } = require('../../../utils/Misc');
// makeId = jest.fn();
// jest.mock('../../../utils/Misc');

describe('Registry', () => {


	describe('.set method', () => {

		it('should set item', async () => {
			const BB = new BlueBase();
			const registry = new Registry<string, {}>(BB);

			registry.set('foo', { value: 'bar' });

			expect(registry.get('foo')).toMatchObject({ key: 'foo', value: 'bar' });
		});

		it('should throw an error for unknown item type', async () => {
			const BB = new BlueBase();
			const registry = new Registry<string, {}>(BB);

			expect(() => registry.set('foo', 'bar')).toThrowError('Could not set item. Reason: Unknown item type.');
		});

	});


	describe('value setter/getters', () => {

		it('should set a value of an unknown item', async () => {
			const BB = new BlueBase();
			const registry = new Registry<string, {}>(BB);

			registry.setValue('foo', 'bar');

			expect(registry.getValue('foo')).toBe('bar');
		});

		it('should set a value of a known item', async () => {
			const BB = new BlueBase();
			const registry = new Registry<string, {}>(BB);

			registry.set('foo', { value: 'bar' });
			registry.setValue('foo', 'baz');

			expect(registry.getValue('foo')).toBe('baz');
		});

		it('should register a Plugin', async () => {
			const BB = new BlueBase();
			const registry = new Registry<string, {}>(BB);

			registry.setValue('foo', 'bar');

			expect(registry.getValue('foo')).toBe('bar');
		});

		it('should return undefined for unkown item', async () => {
			const BB = new BlueBase();
			const registry = new Registry<string, {}>(BB);

			expect(registry.getValue('foo')).toBe(undefined);
		});

	});


	describe('meta setter/getters', () => {

		it('should return undefined when setting meta value of an unknown item', async () => {
			const BB = new BlueBase();
			const registry = new Registry<string, { preload: boolean }>(BB);

			registry.setMeta('foo', 'preload', true);

			expect(registry.getMeta('foo', 'preload')).toBe(undefined);
		});

		it('should set meta value of an item', async () => {
			const BB = new BlueBase();
			const registry = new Registry<string, { preload: boolean, loaded: string }>(BB);

			registry.set('foo', { value: 'bar' });
			registry.setMeta('foo', 'preload', true);
			registry.setMeta('foo', 'loaded', 'yes');

			expect(registry.getMeta('foo', 'preload')).toBe(true);
			expect(registry.getMeta('foo', 'loaded')).toBe('yes');
		});

	});


	describe('.has method', () => {

		it('should return false for an unknown item', async () => {
			const BB = new BlueBase();
			const registry = new Registry<string, { preload: boolean }>(BB);

			expect(registry.has('foo')).toBe(false);
		});

		it('should set meta value of an item', async () => {
			const BB = new BlueBase();
			const registry = new Registry<string, { preload: boolean, loaded: string }>(BB);

			registry.set('foo', { value: 'bar' });
			expect(registry.has('foo')).toBe(true);
		});

	});

	describe('.resolve method', () => {

		it('should resolve value for a known item', async () => {
			const BB = new BlueBase();
			const registry = new Registry<string, { preload: boolean }>(BB);

			registry.setValue('foo', 'bar');

			const value = await registry.resolve('foo');
			expect(value).toBe('bar');
		});

		it('should resolve value for first known item', async () => {
			const BB = new BlueBase();
			const registry = new Registry<string, { preload: boolean }>(BB);

			registry.setValue('foo', 'bar');
			registry.setValue('faa', 'baz');
			registry.setValue('far', 'bu');

			const value = await registry.resolve('foo', 'faa', 'far');
			expect(value).toBe('bar');
		});

		it('should resolve value for a backup item', async () => {
			const BB = new BlueBase();
			const registry = new Registry<string, { preload: boolean }>(BB);

			registry.setValue('far', 'bu');

			const value = await registry.resolve('foo', 'faa', 'far');
			expect(value).toBe('bu');
		});

	});

	describe('.delete method', () => {

		it('should delete a registry item', async () => {
			const BB = new BlueBase();
			const registry = new Registry<string, { preload: boolean }>(BB);

			registry.setValue('foo', 'bar');
			registry.delete('foo');

			expect(registry.has('foo')).toBe(false);
		});

	});

	describe('.clear method', () => {

		it('should clear registry', async () => {
			const BB = new BlueBase();
			const registry = new Registry<string, { preload: boolean }>(BB);

			registry.setValue('foo', 'bar');
			registry.setValue('faa', 'baz');
			registry.setValue('far', 'bu');
			expect(registry.size()).toBe(3);

			registry.clear();

			expect(registry.size()).toBe(0);
		});

	});

	describe('.entries method', () => {

		it('should return entries iterator', async () => {
			const BB = new BlueBase();
			const registry = new Registry<string, { preload: boolean }>(BB);

			registry.setValue('foo', 'bar');
			registry.setValue('faa', 'baz');
			registry.setValue('far', 'bu');

			const iterator = registry.entries();

			expect(iterator.next().value).toMatchObject(['foo', { key: 'foo', value: 'bar' }]);
			expect(iterator.next().value).toMatchObject(['faa', { key: 'faa', value: 'baz' }]);
			expect(iterator.next().value).toMatchObject(['far', { key: 'far', value: 'bu' }]);
		});

	});

	describe('.keys method', () => {

		it('should return keys iterator', async () => {
			const BB = new BlueBase();
			const registry = new Registry<string, { preload: boolean }>(BB);

			registry.setValue('foo', 'bar');
			registry.setValue('faa', 'baz');
			registry.setValue('far', 'bu');

			const iterator = registry.keys();

			expect(iterator.next().value).toBe('foo');
			expect(iterator.next().value).toBe('faa');
			expect(iterator.next().value).toBe('far');
		});

	});

	describe('.values method', () => {

		it('should return values iterator', async () => {
			const BB = new BlueBase();
			const registry = new Registry<string, { preload: boolean }>(BB);

			registry.setValue('foo', 'bar');
			registry.setValue('faa', 'baz');
			registry.setValue('far', 'bu');

			const iterator = registry.values();

			expect(iterator.next().value).toMatchObject({ key: 'foo', value: 'bar' });
			expect(iterator.next().value).toMatchObject({ key: 'faa', value: 'baz' });
			expect(iterator.next().value).toMatchObject({ key: 'far', value: 'bu' });
		});

	});

	describe('.size method', () => {

		it('should return correct size', async () => {
			const BB = new BlueBase();
			const registry = new Registry<string, { preload: boolean }>(BB);

			expect(registry.size()).toBe(0);

			registry.setValue('foo', 'bar');
			expect(registry.size()).toBe(1);

			registry.setValue('faa', 'baz');
			expect(registry.size()).toBe(2);

			registry.setValue('far', 'bu');
			expect(registry.size()).toBe(3);

			registry.delete('foo');
			expect(registry.size()).toBe(2);
		});

	});

	describe('.forEach method', () => {

		it('should run a forEach loop', async () => {
			const BB = new BlueBase();
			const registry = new Registry<string, { preload: boolean }>(BB);

			registry.setValue('foo', 'bar');
			registry.setValue('faa', 'baz');
			registry.setValue('far', 'bu');

			const arr: any = [];

			registry.forEach((value, key) => {
				arr.push([key, value]);
			});

			expect(arr[0]).toMatchObject(['foo', { key: 'foo', value: 'bar' }]);
			expect(arr[1]).toMatchObject(['faa', { key: 'faa', value: 'baz' }]);
			expect(arr[2]).toMatchObject(['far', { key: 'far', value: 'bu' }]);
		});

	});


	describe('.filter method', () => {

		it('should filter items', async () => {
			const BB = new BlueBase();
			const registry = new Registry<any, {}>(BB);

			registry.setValue('title', 'Config Registry Test');
			registry.setValue('subtitle', 'We are just testing');
			registry.setValue('plugin.test.foo', 5);
			registry.setValue('plugin.test.bar', 10);
			registry.setValue('plugin.another.check', true);

			const filteredConfigs = registry.filter((_value: any, key: string) => {
				return key.startsWith('plugin.test.');
			});

			expect(filteredConfigs['plugin.test.foo'].value).toBe(5);
			expect(filteredConfigs['plugin.test.bar'].value).toBe(10);
			expect(Object.keys(filteredConfigs).length).toBe(2);
		});

	});
	describe('.isValue method', () => {

		it('should return true', async () => {
			const BB = new BlueBase();
			const registry = new Registry<string, {}>(BB);

			expect((registry as any).isValue('foo')).toBe(true);
		});

	});

	describe('.subscribe method', () => {

		it('should successfully subscribe to a registry item', async () => {
			const BB = new BlueBase();
			const registry = new Registry<number, {}>(BB);

			expect((registry as any).subscriptions.get('bar')).toBe(undefined);

			registry.subscribe('bar', (value) => {
				expect(value).toBe(10);
			});

			expect((registry as any).subscriptions.get('bar').size).toBe(1);

			registry.subscribe('bar', (value) => {
				expect(value).toBe(10);
			});

			expect((registry as any).subscriptions.get('bar').size).toBe(2);

			registry.setValue('foo', 5);
			registry.setValue('bar', 10);
			registry.setValue('baz', 15);
		});

		it('should successfully subscribe to an unknown registry item', async () => {
			const BB = new BlueBase();
			const registry = new Registry<number, {}>(BB);

			registry.subscribe('bar', (value) => {
				expect(value).toBe(10);
			});

			registry.setValue('foo', 5);
			registry.setValue('bar', 10);
			registry.setValue('baz', 15);
		});

	});

	describe('.unsubscribe method', () => {

		it('should successfully unsubscribe a config by subId', async () => {
			const BB = new BlueBase();
			const registry = new Registry<number, {}>(BB);

			const subId = registry.subscribe('bar', () => { return; });

			expect((registry as any).subscriptions.get('bar').get(subId)).toBeTruthy();

			registry.unsubscribe('bar', subId);

			expect((registry as any).subscriptions.get('bar').get(subId)).toBeFalsy();
		});

		it('should throw an error for unknown config', async () => {
			const BB = new BlueBase();
			const registry = new Registry<number, {}>(BB);

			// tslint:disable-next-line
			expect(() => registry.unsubscribe('foo', 'bar')).toThrow('Could not unsubscribe from a registry item. Reason: No item with key "foo" registered.');
		});

		it('should throw an error for unknown subscription ID', async () => {
			const BB = new BlueBase();
			const registry = new Registry<string, {}>(BB);

			registry.setValue('foo', 'bar');
			registry.subscribe('foo', () => { return; });

			// tslint:disable-next-line
			expect(() => registry.unsubscribe('foo', '123')).toThrow('Could not unsubscribe from a registry item. Reason: No subscription with id "123" registered.');
		});

	});

	// describe.only('.createUniqueSubscriptionId method', () => {

	// 	it('should successfully unsubscribe a config by subId', async () => {
	// 		// const BB = new BlueBase();
	// 		// const registry = new Registry<number, {}>(BB);

	// 		(makeId as any)
	// 		.mockReturnValueOnce('foo')
	// 		.mockReturnValueOnce('foo')
	// 		.mockReturnValueOnce('bar');

	// 		expect(makeId()).toBe('foo');
	// 		expect(makeId()).toBe('foo');
	// 		expect(makeId()).toBe('bar');
	// 	});

	// });

});