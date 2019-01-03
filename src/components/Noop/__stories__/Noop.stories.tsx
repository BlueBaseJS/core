import { Noop } from '../../../getComponent';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('Noop', module)

	.add('With default props', () => (
		<Noop />
	));