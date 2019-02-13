import { boot } from './boot';
import { components } from './components';
import { configs } from './configs';
import { plugins } from './plugins';
import { routes } from './routes';
import { themes } from './themes';

export default {
	...boot,
	...components,
	...configs,
	...plugins,
	...routes,
	...themes,
};
