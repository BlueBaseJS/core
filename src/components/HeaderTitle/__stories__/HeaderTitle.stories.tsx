// tslint:disable:no-console
import { HeaderTitle } from '../../../';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';


storiesOf('HeaderTitle', module)

.add('Basic Example', () => (
	<HeaderTitle>A very long heading title sentence.</HeaderTitle>
));
