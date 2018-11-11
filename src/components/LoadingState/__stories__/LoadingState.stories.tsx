import React from 'react';
import storiesOf from '@bluebase/storybook-addon';
import { withBlueBase } from '../../../Context';

storiesOf('LoadingState', module)

	.add('With default props', withBlueBase(({ BB }) => (
		<BB.Components.LoadingState retry={() => null} timedOut={false} />
	)));