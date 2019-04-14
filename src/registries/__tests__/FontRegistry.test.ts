// tslint:disable:object-literal-sort-keys
import { Font, FontRegistry } from '../FontRegistry';
import { BlueBase } from '../../BlueBase';

describe('FontRegistry', () => {
	describe('.register method', () => {
		it('should register a path value', async () => {
			const BB = new BlueBase();
			const Fonts = new FontRegistry(BB);

			await Fonts.register('foo', './foo/bar.jpg');
			expect(Fonts.getValue('foo')).toBe('./foo/bar.jpg');
		});

		it('should register a react native require source', async () => {
			const BB = new BlueBase();
			const Fonts = new FontRegistry(BB);

			await Fonts.register('foo', 10);
			expect(Fonts.getValue('foo')).toBe(10);
		});

		it('should register a registry item', async () => {
			const BB = new BlueBase();
			const Fonts = new FontRegistry(BB);

			await Fonts.register({
				key: 'foo',
				preload: true,
				value: './foo/bar.jpg',
			});

			const item = Fonts.get('foo') as Font;
			expect(item.preload).toBe(true);
			expect(item.value).toBe('./foo/bar.jpg');
		});
	});

	describe('.registerCollection method', () => {
		// it('should register a config collection', async () => {
		// 	const BB = new BlueBase();
		// 	const Fonts = new FontRegistry(BB);
		// 	await Fonts.registerCollection(configs);
		// 	expect(Fonts.getValue('title')).toBe('Font Registry Test');
		// 	expect(Fonts.getValue('subtitle')).toBe('We are just testing');
		// 	expect(Fonts.size()).toBe(5);
		// });
		// it('should filter a config collection during register', async () => {
		// 	const BB = new BlueBase();
		// 	const Fonts = new FontRegistry(BB);
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
		// 	await Fonts.registerCollection(configs);
		// 	expect(Fonts.getValue('title')).toBe('Changed title');
		// 	expect(Fonts.getValue('subtitle')).toBe('Changed subtitle');
		// 	expect(Fonts.getValue('plugin.test.bar')).toBe(10);
		// 	expect(Fonts.size()).toBe(5);
		// });
	});
});
