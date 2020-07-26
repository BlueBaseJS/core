import { LoadingStateProps } from '@bluebase/components';
import React from 'react';
import { getComponent } from '../../../getComponent';
import storiesOf from '@bluebase/storybook-addon';

const LoadingState = getComponent<LoadingStateProps>('LoadingState');

storiesOf('LoadingState', module)
	.add('With default props', () => <LoadingState />)

	.add('With timedOut', () => <LoadingState timedOut={true} />)

	.add('With timedOut and retry', () => (
		<LoadingState timedOut={true} retry={() => console.log('Hello')} />
	));
