import * as React from 'react';
// tslint:disable-next-line:no-implicit-dependencies
import { storiesOf } from '@storybook/react';
import BR from '../index';
import ComponentStateButton from '../components/ComponentState/ComponentStateButton';

const stories = storiesOf('Avatar', module);

stories.add('ComponentStateButton', () => {
	return (
    <ComponentStateButton/>);
});
