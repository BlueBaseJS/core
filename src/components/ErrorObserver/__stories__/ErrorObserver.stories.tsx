import { ErrorObserver } from '../../../getComponent';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

const Bang = () => {
	throw Error('💥 Boom!');
};

storiesOf('ErrorObserver', module)

	.add('Basic Example', () => (
		<ErrorObserver><Bang /></ErrorObserver>
	));