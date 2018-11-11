// tslint:disable:object-literal-sort-keys
import { BlueBase } from '../../../BlueBase';

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
			expect(BB.Configs.get('foo')).toBe('bar');
		});

		it('should hook a config property and then register it', async () => {
			const BB = new BlueBase();
			await BB.Hooks.register('bluebase.config.set', {
				name: 'change-config',
				handler: ({ key }: { key: string, value: any }) => {
					return {
						key,
						value: 'changed value in a hook'
					};
				}
			});
			await BB.Configs.register('foo', 'bar');
			expect(BB.Configs.get('foo')).toBe('changed value in a hook');
		});

	});


	describe('.registerCollection method', () => {

		it('should register a config property', async () => {
			const BB = new BlueBase();
			await BB.Configs.registerCollection(configs);
			expect(BB.Configs.get('title')).toBe('Config Registry Test');
			expect(BB.Configs.get('subtitle')).toBe('We are just testing');
			expect(BB.Configs.size()).toBe(5);
		});

		it('should hook a config collection during register', async () => {
			const BB = new BlueBase();
			await BB.Hooks.register('bluebase.config.set', {
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
			expect(BB.Configs.get('title')).toBe('Changed title');
			expect(BB.Configs.get('subtitle')).toBe('Changed subtitle');
			expect(BB.Configs.get('plugin.test.bar')).toBe(10);
			expect(BB.Configs.size()).toBe(5);
		});
	});

	describe('.register method', () => {

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
});