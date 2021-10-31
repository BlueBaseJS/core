import { StatefulComponentProps } from '@bluebase/components';
import storiesOf from '@bluebase/storybook-addon';
import React from 'react';
import { Text } from 'react-native';

import { getComponent } from '../../../getComponent';

const StatefulComponent = getComponent<StatefulComponentProps>('StatefulComponent');

storiesOf('StatefulComponent', module)
	.add('should show empty state as no data is provided', () => <StatefulComponent />)

	.add('should show empty state as data is an empty array', () => <StatefulComponent data={[]} />)

	.add('should show loading state if loading is set to true', () => (
		<StatefulComponent loading />
	))
	.add('should show Loading text if loading is set to true', () => (
		// tslint:disable-next-line: jsx-no-lambda
		<StatefulComponent loading loadingComponent={() => <Text>Loading</Text>} />
	));
