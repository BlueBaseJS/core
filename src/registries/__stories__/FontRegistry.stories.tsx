import { BlueBaseApp } from '../../..';
import React from 'react';
import { Text } from 'react-native';
import storiesOf from '@bluebase/storybook-addon';

// tslint:disable-next-line: no-var-requires no-submodule-imports
const MaterialIcons = require('react-native-vector-icons/Fonts/MaterialIcons.ttf');

storiesOf('FontRegistry', module).add('Load Material Icons Font', () => (
	<BlueBaseApp fonts={{ MaterialIcons }}>
		<Text style={{ fontFamily: 'MaterialIcons', fontSize: 50, color: 'green' }}></Text>
	</BlueBaseApp>
));
