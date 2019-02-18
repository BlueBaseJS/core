import { BootOptions } from '@bluebase/core';
import commonBootOptions from '../common/bluebase';
import deepmerge from 'deepmerge';

// const assetsPath = `../../assets/expo`;

/**
 * Add your platform specific configs here.
 * We keep all the universal (cross platform) configs in
 * the common folder, and extend them here.
 */
const bootOptions: Partial<BootOptions> = {

	// config: {

	// 	wallpaper: {
	// 		backgroundColor: 'white',
	// 		resizeMode: 'cover',
	// 		source: require(`${assetsPath}/wallpaper.jpg`),
	// 	},
	// }
};

export default deepmerge(commonBootOptions, bootOptions);
