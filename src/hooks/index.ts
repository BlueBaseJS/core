import { boot } from './boot';
import { components } from './components';
import { plugins } from './plugins';
import { themes } from './themes';

export default {
	...boot,
	...components,
	...plugins,
	...themes
};
