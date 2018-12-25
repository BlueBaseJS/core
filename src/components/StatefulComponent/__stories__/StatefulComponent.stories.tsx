import React from 'react';
import { StatefulComponent } from '../../../getComponent';
import storiesOf from '@bluebase/storybook-addon';


storiesOf('StatefulComponent', module)

.add('should show empty state as no data is provided', () => (
	<StatefulComponent />
))

.add('should show empty state as data is an empty array', () => (
	<StatefulComponent data={[]} />
))

.add('should show loading state if loading is set to true', () => (
	<StatefulComponent loading={true} />
));