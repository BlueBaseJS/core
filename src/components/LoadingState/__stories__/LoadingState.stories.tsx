import { LoadingState } from '../../../getComponent';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('LoadingState', module)

	.add('With default props', () => (
		<LoadingState />
	))

	.add('With timedOut', () => (
		<LoadingState timedOut={true} />
	))

	.add('With timedOut and retry', () => (
		<LoadingState timedOut={true} retry={() => console.log('Hello')}/>
	));
