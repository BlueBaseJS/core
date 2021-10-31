import commonBootOptions from '../../boot';
import { BootOptions, merge } from '../../src';

/**
 * Add your platform specific configs here.
 * We keep all the universal (cross platform) configs in
 * the common folder, and extend them here.
 */
const bootOptions: Partial<BootOptions> = {};

export default merge(commonBootOptions, bootOptions);
