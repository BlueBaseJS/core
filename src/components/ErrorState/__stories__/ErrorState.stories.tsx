import { ErrorState } from '../../../getComponent';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('ErrorState', module)

	.add('With default props', () => (
		<ErrorState />
	));