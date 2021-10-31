import { ErrorObserverProps } from '@bluebase/components';
import storiesOf from '@bluebase/storybook-addon';
import React from 'react';

import { getComponent } from '../../../getComponent';

const ErrorObserver = getComponent<ErrorObserverProps>('ErrorObserver');

const Bang = () => {
	throw Error('💥 Boom!');
};

storiesOf('ErrorObserver', module).add('Basic Example', () => (
	<ErrorObserver>
		<Bang />
	</ErrorObserver>
));
