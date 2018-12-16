import { BlueBase, BootOptions } from '../BlueBase';
import { BlueBaseDefaultConfigs } from '../configs';
import { HookInputNestedCollection } from '../registries';


export const configs: HookInputNestedCollection = {

	'bluebase.configs.register': [{
		key: 'bluebase-configs-register-default',
		priority: 5,

		// tslint:disable-next-line:object-literal-sort-keys
		value: async (bootOptions: BootOptions, _ctx: {}, BB: BlueBase) => {

			await BB.Configs.registerCollection(BlueBaseDefaultConfigs);
			await BB.Configs.registerCollection(bootOptions.configs);

			return bootOptions;
		},
	}]
};
