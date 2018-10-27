// import { BlueBase, BlueBaseConsumer } from '@blueeast/bluerain';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

import { BlueBaseApp } from '../BlueBaseApp';

storiesOf('BlueBaseApp', module)
	.add('Main App', () => (
		<BlueBaseApp />
	));