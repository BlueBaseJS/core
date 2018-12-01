import { BlueBase, BlueBaseConsumer } from '../../..';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

const Bang = () => {
	throw Error('💥 Boom!');
};

storiesOf('ErrorObserver', module)

	.add('Basic Example', () => (
		<BlueBaseConsumer children={(BB: BlueBase) => (
			<BB.Components.ErrorObserver children={() => <Bang />} />
		)} />
	));