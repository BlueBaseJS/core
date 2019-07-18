import { BlueBaseApp } from '../../components';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('PluginRegistry', module).add('Dummy Plugins', () => (
	<BlueBaseApp plugins={[import('./Plugin1'), import('./Plugin2')] as any} />
));
