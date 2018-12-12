import { BlueBaseModuleRegistry, BlueBaseModuleRegistryItem } from '../BlueBaseModuleRegistry';
import { BlueBase } from '../../../BlueBase';
import { createBlueBaseModule } from '../../../utils';

describe('BlueBaseModuleRegistry', () => {


	describe('.set method', () => {

		it('should set item', async () => {
			const BB = new BlueBase();
			const registry = new BlueBaseModuleRegistry<BlueBaseModuleRegistryItem<string>>(BB);

			registry.set('foo', { value: { default: 'bar' } });
			const result = await registry.getValue('foo');

			expect(result).toBe('bar');
		});

		it('should set an item inside an ES Module', async () => {
			const BB = new BlueBase();
			const registry = new BlueBaseModuleRegistry<BlueBaseModuleRegistryItem<string>>(BB);

			registry.set('foo', { default: { value: 'bar' } } as any);
			const result = await registry.getValue('foo');

			expect(result).toBe('bar');
		});

	});

	describe('value setter/getters', () => {

		it('should set a value of an unknown item', async () => {
			const BB = new BlueBase();
			const registry = new BlueBaseModuleRegistry<BlueBaseModuleRegistryItem<string>>(BB);

			registry.setValue('foo', 'bar');

			expect(await registry.getValue('foo')).toBe('bar');
		});

		it('should set a value of a known item', async () => {
			const BB = new BlueBase();
			const registry = new BlueBaseModuleRegistry<BlueBaseModuleRegistryItem<string>>(BB);

			registry.set('foo', { value: 'bar' });
			registry.setValue('foo', 'baz');

			const value = registry.getValue('foo');
			const waitedValue = await value;
			expect(waitedValue).toBe('baz');
		});

		it('should get value of an item set through setValue', async () => {
			const BB = new BlueBase();
			const registry = new BlueBaseModuleRegistry<BlueBaseModuleRegistryItem<string>>(BB);

			registry.setValue('foo', 'bar');

			expect(await registry.getValue('foo')).toBe('bar');
		});

		it('should return undefined for unkown item', async () => {
			const BB = new BlueBase();
			const registry = new BlueBaseModuleRegistry<BlueBaseModuleRegistryItem<string>>(BB);

			expect(await registry.getValue('foo')).toBe(undefined);
		});

		it('should get value for first known item', async () => {
			const BB = new BlueBase();
			const registry = new BlueBaseModuleRegistry<BlueBaseModuleRegistryItem<string>>(BB);

			registry.setValue('foo', 'bar');
			registry.setValue('faa', 'baz');
			registry.setValue('far', 'bu');

			const value = await registry.getValue('foo', 'faa', 'far');
			expect(value).toBe('bar');
		});

		it('should get value for a backup item', async () => {
			const BB = new BlueBase();
			const registry = new BlueBaseModuleRegistry<BlueBaseModuleRegistryItem<string>>(BB);

			registry.setValue('far', 'bu');

			const value = await registry.getValue('foo', 'faa', 'far');
			expect(value).toBe('bu');
		});

	});


	describe('.register method', () => {

		it('should register an item', async () => {
			const BB = new BlueBase();
			const registry = new BlueBaseModuleRegistry<BlueBaseModuleRegistryItem<string>>(BB);

			await registry.register('some', Promise.resolve({ value: 'foo', preload: true, }));

			const item = registry.get('some');
			expect(await (item as any).value).toBe('foo');
			expect(await (item as any).preload).toBe(true);
		});

		it('should register a value', async () => {
			const BB = new BlueBase();
			const registry = new BlueBaseModuleRegistry<BlueBaseModuleRegistryItem<string>>(BB);

			await registry.register('some', Promise.resolve('foo'));
			expect(await registry.getValue('some')).toBe('foo');
		});

		it('should throw an error for unknown input', async () => {
			const BB = new BlueBase();
			const registry = new BlueBaseModuleRegistry<BlueBaseModuleRegistryItem<string>>(BB);

			// Override value test to force error
			(registry as any).isValue = () => false;

			try {
				await registry.register('some', Promise.resolve('foo'));
			} catch (error) {
				expect(error.message).toBe('Could not register item. Reason: Unknown item type.');
			}
		});

		it('should register an item without key param', async () => {
			const BB = new BlueBase();
			const registry = new BlueBaseModuleRegistry<BlueBaseModuleRegistryItem<string>>(BB);

			await registry.register(Promise.resolve({ key: 'some', value: 'foo', preload: true }));

			const item = registry.get('some');
			expect(await (item as any).value).toBe('foo');
			expect(await (item as any).preload).toBe(true);
		});

		it('should throw an error, becuase theres no key i  item', async () => {
			const BB = new BlueBase();
			const registry = new BlueBaseModuleRegistry<BlueBaseModuleRegistryItem<string>>(BB);

			try {
				await registry.register(Promise.resolve({ value: 'foo', preload: true }));
			} catch (error) {
				expect(error.message).toBe('Could not register item. Reason: No key given.');
			}
		});

		it('should throw an error, becuase theres no key in value', async () => {
			const BB = new BlueBase();
			const registry = new BlueBaseModuleRegistry<BlueBaseModuleRegistryItem<string>>(BB);

			try {
				await registry.register(Promise.resolve('foo'));
			} catch (error) {
				expect(error.message).toBe('Could not register item. Reason: No item given.');
			}
		});

	});

	describe('.isValue method', () => {

		it('should return true', async () => {
			const BB = new BlueBase();
			const registry = new BlueBaseModuleRegistry<BlueBaseModuleRegistryItem<string>>(BB);

			expect((registry as any).isValue(createBlueBaseModule('foo'))).toBe(true);
		});

		it('should return false because value is not BlueBaseModule', async () => {
			const BB = new BlueBase();
			const registry = new BlueBaseModuleRegistry<BlueBaseModuleRegistryItem<string>>(BB);

			expect((registry as any).isValue('foo')).toBe(false);
		});

	});

	describe('.isValue method', () => {

		it('should return true', async () => {
			const BB = new BlueBase();
			const registry = new BlueBaseModuleRegistry<BlueBaseModuleRegistryItem<string>>(BB);

			expect((registry as any).isInputValue('foo')).toBe(true);
		});

	});

});