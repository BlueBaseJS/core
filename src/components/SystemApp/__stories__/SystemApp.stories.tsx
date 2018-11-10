import React from 'react';
import { SystemApp } from '../SystemApp';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('SystemApp', module)

	.add('Basic Example', () => (
		<SystemApp />
	));