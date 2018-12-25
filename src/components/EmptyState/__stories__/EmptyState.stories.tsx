import { EmptyState } from '../../../getComponent';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('EmptyState', module)

	.add('With default props', () => (
		<EmptyState />
	));