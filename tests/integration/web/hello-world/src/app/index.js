import  { boot } from '../../../../../../src/boot';

import apps from './apps';
import config from './config';
import plugins from './plugin';

boot({ apps, config, plugins });
