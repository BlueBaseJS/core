// import { BootOptions } from '../../src';
// import commonBootOptions from '../common/bluerain';
// import deepmerge from 'deepmerge';

// TODO: Only for evaluation, remove this
import DummyPlugin from './sample';

/**
 * Add your platform specific configs here. 
 * We keep all the universal (cross platform) configs in 
 * the common folder, and extend them here.
 */
const bootOptions = {

	plugins: [
		// TODO: Only for evaluation, remove this
		DummyPlugin
	],
	config: {

		// wallpaper: {
		// 	backgroundColor: 'white',
		// 	resizeMode: 'cover',
		// 	source: require('../../assets/wallpaper.jpg'),
		// },
	}
};

export default bootOptions;
