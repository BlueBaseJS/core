import { BootOptions } from '../../src';
import commonBootOptions from '../common/bluebase';
import deepmerge from 'deepmerge';

/**
 * Add your platform specific configs here.
 * We keep all the universal (cross platform) configs in
 * the common folder, and extend them here.
 */
const bootOptions: Partial<BootOptions> = {};

export default deepmerge(commonBootOptions, bootOptions);
