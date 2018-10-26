// import { BootOptions } from '../../src';
// import commonBootOptions from '../common/bluebase';
// import deepmerge from 'deepmerge';

/**
 * Add your platform specific configs here. 
 * We keep all the universal (cross platform) configs in 
 * the common folder, and extend them here.
 */
const bootOptions = {

	plugins: [
		// TODO: Only for evaluation, remove this
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
