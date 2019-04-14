import { assets } from './assets';
import { boot } from './boot';
import { components } from './components';
import { configs } from './configs';
import { fonts } from './fonts';
import { navigation } from './navigation';
import { plugins } from './plugins';
import { themes } from './themes';

export default {
	...assets,
	...boot,
	...components,
	...configs,
	...fonts,
	...plugins,
	...navigation,
	...themes,
};
