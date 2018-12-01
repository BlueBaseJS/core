// tslint:disable:object-literal-sort-keys
import { BlueBase } from '../../../BlueBase';
import { ConfigRegistryItem } from '../ConfigRegistry';

const configs = {
	'title': 'Config Registry Test',
	'subtitle': 'We are just testing',
	'plugin.test.foo': 5,
	'plugin.test.bar': 10,
	'plugin.another.check': true,
};


describe('ConfigRegistry', () => {

	describe('.register method', () => {

		it('should register a config property', async () => {
			const BB = new BlueBase();
			await BB.Configs.register('foo', 'bar');
			expect(BB.Configs.getValue('foo')).toBe('bar');
		});

		it('should hook a config property and then register it', async () => {
			const BB = new BlueBase();
			await BB.Hooks.register('bluebase.config.beforeSave', {
				name: 'change-config',
				handler: ({ key }: { key: string, value: any }) => {
					return {
						key,
						value: 'changed value in a hook'
					};
				}
			});
			await BB.Configs.register('foo', 'bar');
			expect(BB.Configs.getValue('foo')).toBe('changed value in a hook');
		});

	});


	describe('.registerCollection method', () => {

		it('should register a config property', async () => {
			const BB = new BlueBase();
			await BB.Configs.registerCollection(configs);
			expect(BB.Configs.getValue('title')).toBe('Config Registry Test');
			expect(BB.Configs.getValue('subtitle')).toBe('We are just testing');
			expect(BB.Configs.size()).toBe(5);
		});

		it('should hook a config collection during register', async () => {
			const BB = new BlueBase();
			await BB.Hooks.register('bluebase.config.beforeSave', {
				name: 'change-config',
				handler: ({ key, value }: { key: string, value: any }) => {

					if (key === 'title') {
						return { key, value: 'Changed title' };
					}
					if (key === 'subtitle') {
						return { key, value: 'Changed subtitle' };
					}
					return { key, value };
				}
			});
			await BB.Configs.registerCollection(configs);
			expect(BB.Configs.getValue('title')).toBe('Changed title');
			expect(BB.Configs.getValue('subtitle')).toBe('Changed subtitle');
			expect(BB.Configs.getValue('plugin.test.bar')).toBe(10);
			expect(BB.Configs.size()).toBe(5);
		});
	});

	describe('.filter method', () => {

		it('should register a config property', async () => {
			const BB = new BlueBase();
			await BB.Configs.registerCollection(configs);
			const filteredConfigs = BB.Configs.filter((_value: any, key: string) => {
				return key.startsWith('plugin.test.');
			});

			expect(filteredConfigs['plugin.test.foo']).toBe(5);
			expect(filteredConfigs['plugin.test.bar']).toBe(10);
			expect(Object.keys(filteredConfigs).length).toBe(2);
		});

	});

	describe('.getValue method', () => {

		it('should return a config value', async () => {
			const BB = new BlueBase();
			await BB.Configs.register('foo', 'bar');
			expect(BB.Configs.getValue('foo')).toBe('bar');
		});

		it('should return undefined for an unknown config value', async () => {
			const BB = new BlueBase();
			expect(BB.Configs.getValue('foo')).toBe(undefined);
		});

	});

	describe('.subscribe method', () => {

		it('should successfully subscribe to a config', async () => {
			const BB = new BlueBase();

			await BB.Configs.register('bar', 5);

			const item = BB.Configs.get('bar') as ConfigRegistryItem;
			delete item.subscriptions;
			BB.Configs.set('bar', item);

			BB.Configs.subscribe('bar', (value) => {
				expect(value).toBe(10);
			});

			await BB.Configs.register('foo', 5);
			await BB.Configs.register('bar', 10);
			await BB.Configs.register('baz', 15);
		});

		it('should successfully subscribe to an unknown config', async () => {
			const BB = new BlueBase();

			BB.Configs.subscribe('bar', (value) => {
				expect(value).toBe(10);
			});

			await BB.Configs.register('foo', 5);
			await BB.Configs.register('bar', 10);
			await BB.Configs.register('baz', 15);
		});

	});

	describe('.unsubscribe method', () => {

		it('should successfully unsubscribe a config by subId', async () => {
			const BB = new BlueBase();

			const subId = BB.Configs.subscribe('bar', () => { return; });

			let item = BB.Configs.get('bar') as ConfigRegistryItem;
			expect(item.subscriptions[subId]).toBeTruthy();

			BB.Configs.unsubscribe('bar', subId);

			item = BB.Configs.get('bar') as ConfigRegistryItem;
			expect(item.subscriptions[subId]).toBeFalsy();
		});

		it('should throw an error for unknown config', async () => {
			const BB = new BlueBase();
			// tslint:disable-next-line
			expect(() => BB.Configs.unsubscribe('foo', 'bar')).toThrow('Could not unsubscribe from a configuration. Reason: No configuration with key foo registered.');
		});

		it('should throw an error for unknown subscription ID', async () => {
			const BB = new BlueBase();
			await BB.Configs.register('foo', 'bar');
			// tslint:disable-next-line
			expect(() => BB.Configs.unsubscribe('foo', '123')).toThrow('Could not unsubscribe from a configuration. Reason: No subscription with id 123 registered.');
		});

	});
});