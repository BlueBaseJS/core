import { HookHandlerFn, PluginCollection } from '../../registries';
import { BlueBase } from '../../BlueBase';
// import React from 'react';
// import TestRenderer from 'react-test-renderer';
// import { Text } from 'react-native';
import { Noop } from '../../components';
import { plugins } from '../plugins';


const collection: PluginCollection = [{
	enabled: true,
	key: 'a',
	value: {
		components: { A: Noop }
	},
}, {
	enabled: false,
	key: 'b',
	value: {
		components: { B: Noop }
	},
}, {
	enabled: true,
	key: 'c',
	value: {
		components: { C: Noop }
	},
}];

describe('hooks', () => {

	describe('plugins', () => {


		describe('bluebase.plugins.register', () => {

			it(`should register plugins collection`, async () => {

				const hook: HookHandlerFn = (plugins as any)['bluebase.plugins.register'][0].value;
				const BB = new BlueBase();

				await hook(collection, {}, BB);

				expect(BB.Plugins.size()).toBe(3);
			});

		});


		describe('bluebase.plugins.initialize.all', () => {

			it(`should initialize only enabled plugins`, async () => {

				const BB = new BlueBase();
				// await BB.boot();
				await BB.Plugins.registerCollection(collection);
				await BB.Filters.registerNestedCollection(plugins);

				const hook: HookHandlerFn = (plugins as any)['bluebase.plugins.initialize.all'][0].value;
				await hook(null, {}, BB);

				expect(BB.Components.has('A')).toBe(true);
				expect(BB.Components.has('B')).toBe(false);
				expect(BB.Components.has('C')).toBe(true);
			});

		});

	});

});
