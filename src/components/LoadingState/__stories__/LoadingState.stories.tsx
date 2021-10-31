import { LoadingStateProps } from '@bluebase/components';
import storiesOf from '@bluebase/storybook-addon';
import React from 'react';

import { getComponent } from '../../../getComponent';

const LoadingState = getComponent<LoadingStateProps>('LoadingState');

storiesOf('LoadingState', module)
	.add('With default props', () => <LoadingState />)

	.add('With timedOut', () => <LoadingState timedOut />)

	.add('With timedOut and retry', () => (
		<LoadingState timedOut retry={() => console.log('Hello')} />
	));
