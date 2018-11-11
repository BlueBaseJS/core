import { BlueBase, BootOptions } from '../BlueBase';
import { BlueBaseDefaultConfigs } from '../configs';
import { HookInput } from '../registries';


export const configs: { [key: string]: HookInput[] } = {

	'bluebase.configs.register': [{
		name: 'bluebase-configs-register-default',
		priority: 5,

		// tslint:disable-next-line:object-literal-sort-keys
		handler: async (bootOptions: BootOptions, _ctx: {}, BB: BlueBase) => {

			BB.Configs.registerCollection(BlueBaseDefaultConfigs);
			BB.Configs.registerCollection(bootOptions.configs);

			return bootOptions;
		},
	}]
};
