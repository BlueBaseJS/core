import { BlueRain, BlueRainConsumer } from '../../src';
import React from 'react';

export default (props: any) => (
	<BlueRainConsumer>
		{(BR: BlueRain) => (
			<BR.Components.Image
				source="https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_android_black_24px.svg"
				style={{ ...props.style, width: props.size, height: props.size }}
				{...props}
			/>
		)}
	</BlueRainConsumer>
);
