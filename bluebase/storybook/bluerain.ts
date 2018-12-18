// import { BootOptions } from '../../src';
// import commonBootOptions from '../common/bluebase';
// import deepmerge from 'deepmerge';
import { ThemedCard } from '../../src/themes/__stories__/ThemedCard';
import { BootOptions } from '../../src';
/**
 * Add your platform specific configs here. 
 * We keep all the universal (cross platform) configs in 
 * the common folder, and extend them here.
 */
const bootOptions: Partial<BootOptions> = {

	configs: {

		'theme.overrides': {
			components: {
				ThemedCard2: {
					root: {
						backgroundColor: 'green'
					}
				}
			}
		}
		// wallpaper: {
		// 	backgroundColor: 'white',
		// 	resizeMode: 'cover',
		// 	source: require('../../assets/wallpaper.jpg'),
		// },
	},

	components: {
		ThemedCard,
		ThemedCard2: ThemedCard,
		ThemedCard3: {
			styles: {
				root: {
					backgroundColor: 'orange'
				}
			},
			value: ThemedCard,
		},
	},
};

export default bootOptions;
