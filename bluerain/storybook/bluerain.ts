// import { BootOptions } from '../../src';
// import commonBootOptions from '../common/bluebase';
// import deepmerge from 'deepmerge';
import { ThemedCard } from '../../src/registries/ThemeRegistry/__stories__/ThemedCard';
import { BootOptions } from '../../src';
/**
 * Add your platform specific configs here. 
 * We keep all the universal (cross platform) configs in 
 * the common folder, and extend them here.
 */
const bootOptions: Partial<BootOptions> = {

	configs: {

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
			rawComponent: ThemedCard,
			styles: {
				root: {
					backgroundColor: 'orange'
				}
			}
		},
	},

	theme: {
		components: {
			ThemedCard2: {
				root: {
					backgroundColor: 'green'
				}
			}
		}
	}
};

export default bootOptions;
