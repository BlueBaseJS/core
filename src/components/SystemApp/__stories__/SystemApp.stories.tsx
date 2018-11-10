import React from 'react';
import storiesOf from '@bluebase/storybook-addon';
import { SystemApp } from '../SystemApp';

storiesOf('SystemApp', module)

	.add('Basic Example', () => (
		<SystemApp />
	));