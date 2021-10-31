import storiesOf from '@bluebase/storybook-addon';
import React from 'react';

import { BlueBaseApp } from '../../';

storiesOf('PluginRegistry', module).add('Dummy Plugins', () => (
	<BlueBaseApp plugins={[import('./Plugin1'), import('./Plugin2')] as any} />
));
