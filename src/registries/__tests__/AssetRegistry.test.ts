// tslint:disable:object-literal-sort-keys
import { BlueBase } from '../../BlueBase';
import { Asset, AssetRegistry } from '../AssetRegistry';

describe('AssetRegistry', () => {
	describe('.register method', () => {
		it('should register a path value', async () => {
			const BB = new BlueBase();
			const Assets = new AssetRegistry(BB);

			await Assets.register('foo', './foo/bar.jpg');
			expect(Assets.getValue('foo')).toMatchObject({ uri: './foo/bar.jpg' });
		});

		it('should register a react native require source', async () => {
			const BB = new BlueBase();
			const Assets = new AssetRegistry(BB);

			await Assets.register('foo', 10);
			expect(Assets.getValue('foo')).toBe(10);
		});

		it('should register a react native source object', async () => {
			const BB = new BlueBase();
			const Assets = new AssetRegistry(BB);

			await Assets.register('foo', { uri: './foo/bar.jpg' });
			expect(Assets.getValue('foo')).toMatchObject({ uri: './foo/bar.jpg' });
		});

		it('should register a registry item', async () => {
			const BB = new BlueBase();
			const Assets = new AssetRegistry(BB);

			await Assets.register({
				key: 'foo',
				preload: true,
				value: { uri: './foo/bar.jpg' },
			});

			const item = Assets.get('foo') as Asset;
			expect(item.preload).toBe(true);
			expect(item.value).toMatchObject({ uri: './foo/bar.jpg' });
		});
	});

	describe('.resolve method', () => {
		it('should resolve an asset', async () => {
			const BB = new BlueBase();
			const Assets = new AssetRegistry(BB);

			await Assets.register('foo', './foo/bar.jpg');

			const item = Assets.resolve('foo') as Asset;
			expect(item.value).toMatchObject({ uri: './foo/bar.jpg' });
		});

		it('should resolve a backup asset', async () => {
			const BB = new BlueBase();
			const Assets = new AssetRegistry(BB);

			await Assets.register('bar', './foo/bar.jpg');

			const item = Assets.resolve('foo', 'bar', 'baz') as Asset;
			expect(item.value).toMatchObject({ uri: './foo/bar.jpg' });
		});

		it('should return undefined if an asset is not resolved', async () => {
			const BB = new BlueBase();
			const Assets = new AssetRegistry(BB);

			await Assets.register('foo', './foo/bar.jpg');

			const item = Assets.resolve('bar');
			expect(item).toBeUndefined();
		});
	});

	describe('.registerCollection method', () => {
		// it('should register a config collection', async () => {
		// 	const BB = new BlueBase();
		// 	const Assets = new AssetRegistry(BB);
		// 	await Assets.registerCollection(configs);
		// 	expect(Assets.getValue('title')).toBe('Asset Registry Test');
		// 	expect(Assets.getValue('subtitle')).toBe('We are just testing');
		// 	expect(Assets.size()).toBe(5);
		// });
		// it('should filter a config collection during register', async () => {
		// 	const BB = new BlueBase();
		// 	const Assets = new AssetRegistry(BB);
		// 	await BB.Filters.register('bluebase.config.beforeSave', {
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
		// 	await Assets.registerCollection(configs);
		// 	expect(Assets.getValue('title')).toBe('Changed title');
		// 	expect(Assets.getValue('subtitle')).toBe('Changed subtitle');
		// 	expect(Assets.getValue('plugin.test.bar')).toBe(10);
		// 	expect(Assets.size()).toBe(5);
		// });
	});
});
