import React from 'react';
import { getComponent } from '../../../getComponent';
import storiesOf from '@bluebase/storybook-addon';

const SystemContent = getComponent('SystemContent');

storiesOf('SystemContent', module)

	.add('Basic Example', () => (
		<SystemContent />
	));