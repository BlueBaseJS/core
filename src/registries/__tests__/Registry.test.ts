import { BlueBase } from '../../BlueBase';
import { Registry, RegistryItem } from '../Registry';

describe('Registry', () => {
	describe('.set method', () => {
		it('should set item', async () => {
			const BB = new BlueBase();
			const registry = new Registry<RegistryItem<string>>(BB);

			registry.set('foo', { value: 'bar' });

			expect(registry.get('foo')).toMatchObject({ key: 'foo', value: 'bar' });
		});

		it('should throw an error for unknown item type', async () => {
			const BB = new BlueBase();
			const registry = new Registry<RegistryItem<string>>(BB);

			expect(() => registry.set('foo', 'bar' as any)).toThrowError(
				'Could not set registry item "foo". Reason: Unknown item type: "bar"'
			);
		});
	});

	describe('value setter/getters', () => {
		it('should set a value of an unknown item', async () => {
			const BB = new BlueBase();
			const registry = new Registry<RegistryItem<string>>(BB);

			registry.setValue('foo', 'bar');

			expect(registry.getValue('foo')).toBe('bar');
		});

		it('should set a value of a known item', async () => {
			const BB = new BlueBase();
			const registry = new Registry<RegistryItem<string>>(BB);

			registry.set('foo', { value: 'bar' });
			registry.setValue('foo', 'baz');

			expect(registry.getValue('foo')).toBe('baz');
		});

		it('should get value of an item set through setValue', async () => {
			const BB = new BlueBase();
			const registry = new Registry<RegistryItem<string>>(BB);

			registry.setValue('foo', 'bar');

			expect(registry.getValue('foo')).toBe('bar');
		});

		it('should return undefined for unkown item', async () => {
			const BB = new BlueBase();
			const registry = new Registry<RegistryItem<string>>(BB);

			expect(registry.getValue('foo')).toBe(undefined);
		});

		it('should get value for first known item', async () => {
			const BB = new BlueBase();
			const registry = new Registry<RegistryItem<number>>(BB);

			registry.setValue('foo', 'bar');
			registry.setValue('faa', 'baz');
			registry.setValue('far', 'bu');

			const value = registry.getValue('foo', 'faa', 'far');
			expect(value).toBe('bar');
		});

		it('should get value for a backup item', async () => {
			const BB = new BlueBase();
			const registry = new Registry<RegistryItem<string>>(BB);

			registry.setValue('far', 'bu');

			const value = await registry.getValue('foo', 'faa', 'far');
			expect(value).toBe('bu');
		});
	});

	describe('meta setter/getters', () => {
		it('should return undefined when setting meta value of an unknown item', async () => {
			const BB = new BlueBase();
			const registry = new Registry<RegistryItem<string>>(BB);

			registry.setMeta('foo', 'preload', true);

			expect(registry.getMeta('foo', 'preload')).toBe(undefined);
		});

		it('should set meta value of an item', async () => {
			const BB = new BlueBase();
			const registry = new Registry<RegistryItem<string>>(BB);

			registry.setValue('foo', 'bar');
			registry.setMeta('foo', 'preload', true);

			expect(registry.getMeta('foo', 'preload')).toBe(true);
		});

		it('should return defaultValue if meta item doesnt exist', async () => {
			const BB = new BlueBase();
			const registry = new Registry<RegistryItem<string>>(BB);
			registry.setValue('foo', 'bar');

			expect(registry.getMeta('foo', 'some', true)).toBe(true);
		});
	});

	describe('.register method', () => {
		it('should register an item', async () => {
			const BB = new BlueBase();
			const registry = new Registry<RegistryItem<string>>(BB);

			await registry.register('some', { value: 'foo', preload: true });

			const item = registry.get('some');

			expect((item as any).value).toBe('foo');
			expect((item as any).preload).toBe(true);
		});

		it('should register a value', async () => {
			const BB = new BlueBase();
			const registry = new Registry<RegistryItem<string>>(BB);

			await registry.register('some', 'foo');
			expect(registry.getValue('some')).toBe('foo');
		});

		it('should throw an error for unknown input', async () => {
			const BB = new BlueBase();
			const registry = new Registry<RegistryItem<string>>(BB);

			// Override value test to force error
			(registry as any).isValue = () => false;

			try {
				await registry.register('some', 'foo');
			} catch (error: any) {
				expect(error.message).toBe('Could not register item. Reason: Unknown item type.');
			}
		});

		it('should register an item without key param', async () => {
			const BB = new BlueBase();
			const registry = new Registry<RegistryItem<string>>(BB);

			await registry.register({ key: 'some', value: 'foo', preload: true });

			const item = registry.get('some');

			expect((item as any).value).toBe('foo');
			expect((item as any).preload).toBe(true);
		});

		it('should throw an error, becuase theres no key i  item', async () => {
			const BB = new BlueBase();
			const registry = new Registry<RegistryItem<string>>(BB);

			try {
				await registry.register({ value: 'foo', preload: true });
			} catch (error: any) {
				expect(error.message).toBe('Could not register item. Reason: No key given.');
			}
		});

		it('should throw an error, becuase theres only key', async () => {
			const BB = new BlueBase();
			const registry = new Registry<RegistryItem<string>>(BB);

			try {
				await registry.register('foo');
			} catch (error: any) {
				expect(error.message).toBe(
					'Could not register item with key "foo". Reason: No item given.'
				);
			}
		});

		it('should throw an error, if no key is provided or generated', async () => {
			const BB = new BlueBase();
			const registry = new Registry<RegistryItem<string>>(BB);
			(registry as any).generateKey = () => {
				return;
			};

			try {
				await registry.register({ value: 'foo' });
			} catch (error: any) {
				expect(error.message).toBe('Could not register item "undefined". Reason: No key given.');
			}
		});
	});

	describe('.registerCollection', () => {
		it('should register an array collection', async () => {
			const BB = new BlueBase();
			const registry = new Registry<RegistryItem<string>>(BB);

			await registry.registerCollection([
				{ key: 'foo', value: 'bar', preload: true },
				{ key: 'baz', value: 'boo', preload: false },
			]);

			const item = registry.get('foo');
			expect((item as any).value).toBe('bar');
			expect((item as any).preload).toBe(true);

			const item2 = registry.get('baz');
			expect((item2 as any).value).toBe('boo');
			expect((item2 as any).preload).toBe(false);

			expect(registry.size()).toBe(2);
		});

		it('should register an object collection', async () => {
			const BB = new BlueBase();
			const registry = new Registry<RegistryItem<string>>(BB);

			await registry.registerCollection({
				baz: { value: 'boo', preload: false },
				foo: { value: 'bar', preload: true },
			});

			const item = registry.get('foo');
			expect((item as any).value).toBe('bar');
			expect((item as any).preload).toBe(true);

			const item2 = registry.get('baz');
			expect((item2 as any).value).toBe('boo');
			expect((item2 as any).preload).toBe(false);

			expect(registry.size()).toBe(2);
		});

		it('should register an object value collection', async () => {
			const BB = new BlueBase();
			const registry = new Registry<RegistryItem<string>>(BB);

			await registry.registerCollection({
				baz: 'boo',
				foo: 'bar',
			});

			const item = registry.get('foo');
			expect((item as any).value).toBe('bar');

			const item2 = registry.get('baz');
			expect((item2 as any).value).toBe('boo');

			expect(registry.size()).toBe(2);
		});

		it('should throw an error for unknown collection format', async () => {
			const BB = new BlueBase();
			const registry = new Registry<RegistryItem<string>>(BB);

			try {
				await registry.registerCollection('boom' as any);
			} catch (error: any) {
				expect(error.message).toBe(
					'Could not register collection. Reason: Unknown collection type.'
				);
			}
		});

		it('should not do anything if no param given', async () => {
			const BB = new BlueBase();
			const registry = new Registry<RegistryItem<string>>(BB);

			await registry.registerCollection();
			expect(registry.size()).toBe(0);
		});
	});

	describe('.has method', () => {
		it('should return false for an unknown item', async () => {
			const BB = new BlueBase();
			const registry = new Registry<RegistryItem<string>>(BB);

			expect(registry.has('foo')).toBe(false);
		});

		it('should set meta value of an item', async () => {
			const BB = new BlueBase();
			const registry = new Registry<RegistryItem<string>>(BB);

			registry.set('foo', { value: 'bar' });
			expect(registry.has('foo')).toBe(true);
		});
	});

	describe('.delete method', () => {
		it('should delete a registry item', async () => {
			const BB = new BlueBase();
			const registry = new Registry<RegistryItem<string>>(BB);

			registry.setValue('foo', 'bar');
			registry.delete('foo');

			expect(registry.has('foo')).toBe(false);
		});
	});

	describe('.clear method', () => {
		it('should clear registry', async () => {
			const BB = new BlueBase();
			const registry = new Registry<RegistryItem<string>>(BB);

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
			const registry = new Registry<RegistryItem<string>>(BB);

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
			const registry = new Registry<RegistryItem<string>>(BB);

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
			const registry = new Registry<RegistryItem<string>>(BB);

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
			const registry = new Registry<RegistryItem<string>>(BB);

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
			const registry = new Registry<RegistryItem<string>>(BB);

			registry.setValue('foo', 'bar');
			registry.setValue('faa', 'baz');
			registry.setValue('far', 'bu');

			const arr: any = [];

			registry.forEach((value: RegistryItem<string>, key: string) => {
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
			const registry = new Registry<RegistryItem<any>>(BB);

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

	describe('.filterValues method', () => {
		it('should filter values', async () => {
			const BB = new BlueBase();
			const registry = new Registry<RegistryItem<any>>(BB);

			registry.setValue('title', 'Config Registry Test');
			registry.setValue('subtitle', 'We are just testing');
			registry.setValue('plugin.test.foo', 5);
			registry.setValue('plugin.test.bar', 10);
			registry.setValue('plugin.another.check', true);

			const filteredConfigs = registry.filterValues((_value: any, key: string) => {
				return key.startsWith('plugin.test.');
			});

			expect(filteredConfigs['plugin.test.foo']).toBe(5);
			expect(filteredConfigs['plugin.test.bar']).toBe(10);
			expect(Object.keys(filteredConfigs).length).toBe(2);
		});
	});

	describe('.isValue method', () => {
		it('should return true', async () => {
			const BB = new BlueBase();
			const registry = new Registry<RegistryItem<string>>(BB);

			expect((registry as any).isValue('foo')).toBe(true);
		});
	});

	describe('.subscribe method', () => {
		it('should successfully subscribe to a registry item', async () => {
			const BB = new BlueBase();
			const registry = new Registry<RegistryItem<number>>(BB);

			expect((registry as any).subscriptions.get('bar')).toBe(undefined);

			registry.subscribe('bar', (value: number) => {
				expect(value).toBe(10);
			});

			expect((registry as any).subscriptions.get('bar').size).toBe(1);

			registry.subscribe('bar', (value: number) => {
				expect(value).toBe(10);
			});

			expect((registry as any).subscriptions.get('bar').size).toBe(2);

			registry.setValue('foo', 5);
			registry.setValue('bar', 10);
			registry.setValue('baz', 15);
		});

		it('should successfully subscribe to an unknown registry item', async () => {
			const BB = new BlueBase();
			const registry = new Registry<RegistryItem<number>>(BB);

			registry.subscribe('bar', (value: number) => {
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
			const registry = new Registry<RegistryItem<number>>(BB);

			const subId = registry.subscribe('bar', () => {
				return;
			});

			expect((registry as any).subscriptions.get('bar').get(subId)).toBeTruthy();

			registry.unsubscribe('bar', subId);

			expect((registry as any).subscriptions.get('bar').get(subId)).toBeFalsy();
		});

		it('should throw an error for unknown config', async () => {
			const BB = new BlueBase();
			const registry = new Registry<RegistryItem<number>>(BB);

			// tslint:disable-next-line
			expect(() => registry.unsubscribe('foo', 'bar')).toThrow(
				// eslint-disable-next-line max-len
				'Could not unsubscribe from a registry item. Reason: No subsciptions for item with key "foo" registered.'
			);
		});

		it('should return undefined for unknown subscription ID', async () => {
			const BB = new BlueBase();
			const registry = new Registry<RegistryItem<string>>(BB);

			registry.setValue('foo', 'bar');
			registry.subscribe('foo', () => {
				return;
			});

			// tslint:disable-next-line
			expect(registry.unsubscribe('foo', '123')).toBeUndefined();
		});
	});

	describe('.createItem method', () => {
		it('should successfully create a new item', async () => {
			const BB = new BlueBase();
			const registry = new Registry<RegistryItem<number>>(BB);

			expect((registry as any).createItem('foo', { value: 5 })).toMatchObject({
				key: 'foo',
				value: 5,
			});
		});

		it('should throw an error unknown item input', async () => {
			const BB = new BlueBase();
			const registry = new Registry<RegistryItem<number>>(BB);

			expect(() => (registry as any).createItem('foo', 'bar')).toThrowError(
				'Could not set item with key "foo". Reason: Unknown item type: "[object Object]"'
			);
		});
	});

	// describe('.createUniqueSubscriptionId method', () => {

	// 	it('should successfully unsubscribe a config by subId', async () => {
	// 		// const BB = new BlueBase();
	// 		// const registry = new Registry<RegistryItem<number>>(BB);

	// 		(makeId as any)
	// 		.mockReturnValueOnce('foo')
	// 		.mockReturnValueOnce('foo')
	// 		.mockReturnValueOnce('bar');

	// 		expect(makeId()).toBe('foo');
	// 		expect(makeId()).toBe('foo');
	// 		expect(makeId()).toBe('bar');
	// 	});

	// });

	describe('.findOne method', () => {
		it('should resolve a single value', async () => {
			const BB = new BlueBase();
			const registry = new Registry<RegistryItem<number>>(BB);

			registry.setValue('a', 1);
			registry.setValue('b', 2);
			registry.setValue('c', 3);

			expect((registry as any).findOne('a').value).toBe(1);
		});

		it('should resolve a single fallback value, if initial ones are not find', async () => {
			const BB = new BlueBase();
			const registry = new Registry<RegistryItem<number>>(BB);

			registry.setValue('a', 1);
			registry.setValue('b', 2);
			registry.setValue('c', 3);

			expect((registry as any).findOne('d', 'c').value).toBe(3);
		});

		it('should ignore non string values', async () => {
			const BB = new BlueBase();
			const registry = new Registry<RegistryItem<number>>(BB);

			registry.setValue('a', 1);
			registry.setValue('b', 2);
			registry.setValue('c', 3);

			expect((registry as any).findOne('d', 5, 'c').value).toBe(3);
		});

		it('should return undefined if no values are found', async () => {
			const BB = new BlueBase();
			const registry = new Registry<RegistryItem<number>>(BB);

			expect((registry as any).findOne('d', 5, 'c')).toBeUndefined();
		});
	});
});
