import { BlueBaseApp } from '../BlueBaseApp';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';


storiesOf('BlueBaseApp', module)
	.add('Main App', () => (
		<BlueBaseApp />
	));