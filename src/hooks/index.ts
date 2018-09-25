import { boot } from './boot';
import { components } from './components';
import { plugins } from './plugins';

export default {
	...boot,
	...components,
	...plugins,
};
