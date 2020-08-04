import { ErrorObserverProps } from '@bluebase/components';
import React from 'react';
import { getComponent } from '../../../getComponent';
import storiesOf from '@bluebase/storybook-addon';

const ErrorObserver = getComponent<ErrorObserverProps>('ErrorObserver');

const Bang = () => {
	throw Error('💥 Boom!');
};

storiesOf('ErrorObserver', module).add('Basic Example', () => (
	<ErrorObserver>
		<Bang />
	</ErrorObserver>
));
