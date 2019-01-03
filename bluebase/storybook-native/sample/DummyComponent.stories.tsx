declare var module: any;

import React from 'react';
import { getComponent } from '../../../src';
import storiesOf from '@bluebase/storybook-addon';

const DummyComponent = getComponent('DummyComponent');

storiesOf('BlueBase', module)
	.add('DummyComponent', () => (
		<DummyComponent />
	));