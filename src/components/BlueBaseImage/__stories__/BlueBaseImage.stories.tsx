import { BlueBaseApp } from '../../BlueBaseApp';
import { BlueBaseImage } from '../BlueBaseImage';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';


storiesOf('BlueBaseImage', module)
	.add('Simple Example', () => (
		<BlueBaseApp
			assets={{
				Icon: require('../../../../assets/common/icon.png'),
				Logo: require('../../../../assets/common/logo.png'),
			}}
		>
			<BlueBaseImage
				resolve="Logo"
				source={{ uri: 'https://placeimg.com/200/200/any' }}
				style={{ height: 100, width: 100 }}
			/>
			<BlueBaseImage resolve="Icon" style={{ height: 100, width: 100 }} />
		</BlueBaseApp>
	));