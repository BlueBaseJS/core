import { BootOptions } from '../../src';
import commonBootOptions from '../common/bluebase';
import deepmerge from 'deepmerge';

// tslint:disable-next-line: sort-imports
import DummyPlugin from './sample'; // TODO: Only for evaluation, remove this


/**
 * Add your platform specific configs here.
 * We keep all the universal (cross platform) configs in
 * the common folder, and extend them here.
 */
const bootOptions: Partial<BootOptions> = {

	plugins: [
		// TODO: Only for evaluation, remove this
		DummyPlugin
	],
};

export default deepmerge(commonBootOptions, bootOptions);
