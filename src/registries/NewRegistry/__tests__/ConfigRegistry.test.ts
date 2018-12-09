// tslint:disable:object-literal-sort-keys
import { BlueBase } from '../../../BlueBase';
import { ConfigRegistry } from '../ConfigRegistry';

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
			const Configs = new ConfigRegistry(BB);

			await Configs.register('foo', 'bar');
			expect(Configs.getValue('foo')).toBe('bar');
		});

		// it('should hook a config property and then register it', async () => {
		// 	const BB = new BlueBase();
		// 	const Configs = new ConfigRegistry(BB);

		// 	await BB.Hooks.register('bluebase.config.beforeSave', {
		// 		name: 'change-config',
		// 		handler: ({ key }: { key: string, value: any }) => {
		// 			return {
		// 				key,
		// 				value: 'changed value in a hook'
		// 			};
		// 		}
		// 	});
		// 	await Configs.register('foo', 'bar');
		// 	expect(Configs.getValue('foo')).toBe('changed value in a hook');
		// });

	});


	describe('.registerCollection method', () => {

		it('should register a config collection', async () => {
			const BB = new BlueBase();
			const Configs = new ConfigRegistry(BB);

			await Configs.registerCollection(configs);
			expect(Configs.getValue('title')).toBe('Config Registry Test');
			expect(Configs.getValue('subtitle')).toBe('We are just testing');
			expect(Configs.size()).toBe(5);
		});

		// it('should hook a config collection during register', async () => {
		// 	const BB = new BlueBase();
		// 	const Configs = new ConfigRegistry(BB);

		// 	await BB.Hooks.register('bluebase.config.beforeSave', {
		// 		name: 'change-config',
		// 		handler: ({ key, value }: { key: string, value: any }) => {

		// 			if (key === 'title') {
		// 				return { key, value: 'Changed title' };
		// 			}
		// 			if (key === 'subtitle') {
		// 				return { key, value: 'Changed subtitle' };
		// 			}
		// 			return { key, value };
		// 		}
		// 	});
		// 	await Configs.registerCollection(configs);
		// 	expect(Configs.getValue('title')).toBe('Changed title');
		// 	expect(Configs.getValue('subtitle')).toBe('Changed subtitle');
		// 	expect(Configs.getValue('plugin.test.bar')).toBe(10);
		// 	expect(Configs.size()).toBe(5);
		// });
	});

	describe('.filter method', () => {

		it('should filter configs based on the given criteria', async () => {
			const BB = new BlueBase();
			const Configs = new ConfigRegistry(BB);

			await Configs.registerCollection(configs);
			const filteredConfigs = Configs.filter((_value: any, key: string) => {
				return key.startsWith('plugin.test.');
			});

			expect(filteredConfigs['plugin.test.foo'].value).toBe(5);
			expect(filteredConfigs['plugin.test.bar'].value).toBe(10);
			expect(Object.keys(filteredConfigs).length).toBe(2);
		});

	});

	describe('.getValue method', () => {

		it('should return a config value', async () => {
			const BB = new BlueBase();
			const Configs = new ConfigRegistry(BB);

			await Configs.register('foo', 'bar');
			expect(Configs.getValue('foo')).toBe('bar');
		});

		it('should return undefined for an unknown config value', async () => {
			const BB = new BlueBase();
			const Configs = new ConfigRegistry(BB);

			expect(Configs.getValue('foo')).toBe(undefined);
		});

	});

	describe('.subscribe method', () => {

		it('should successfully subscribe to a config', async () => {
			const BB = new BlueBase();
			const Configs = new ConfigRegistry(BB);

			await Configs.register('bar', 5);

			const item = Configs.get('bar');
			(Configs as any).subscriptions.clear();
			Configs.set('bar', item as any);

			Configs.subscribe('bar', (value) => {
				expect(value).toBe(10);
			});

			await Configs.register('foo', 5);
			await Configs.register('bar', 10);
			await Configs.register('baz', 15);
		});

		it('should successfully subscribe to an unknown config', async () => {
			const BB = new BlueBase();
			const Configs = new ConfigRegistry(BB);

			Configs.subscribe('bar', (value) => {
				expect(value).toBe(10);
			});

			await Configs.register('foo', 5);
			await Configs.register('bar', 10);
			await Configs.register('baz', 15);
		});

	});

	describe('.unsubscribe method', () => {

		it('should successfully unsubscribe a config by subId', async () => {
			const BB = new BlueBase();
			const Configs = new ConfigRegistry(BB);

			const subId = Configs.subscribe('bar', () => { return; });

			expect((Configs as any).subscriptions.get('bar').get(subId)).toBeTruthy();

			Configs.unsubscribe('bar', subId);

			expect((Configs as any).subscriptions.get('bar').get(subId)).toBeFalsy();
		});

		it('should throw an error for unknown config', async () => {
			const BB = new BlueBase();
			const Configs = new ConfigRegistry(BB);

			// tslint:disable-next-line
			expect(() => Configs.unsubscribe('foo', '123')).toThrow('Could not unsubscribe from a registry item. Reason: No subsciptions for item with key \"foo\" registered.');
		});

		it('should throw an error for unknown subscription ID', async () => {
			const BB = new BlueBase();
			const Configs = new ConfigRegistry(BB);

			Configs.subscribe('foo', () => { return; });

			// tslint:disable-next-line
			expect(() => Configs.unsubscribe('foo', '123')).toThrow('Could not unsubscribe from a registry item. Reason: No subscription with id "123" registered.');
		});

	});
});