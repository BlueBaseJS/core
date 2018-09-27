import { BlueRain, BlueRainConsumer } from '@blueeast/bluerain';
import React from 'react';

const DummyComponent = () => (
	<BlueRainConsumer>
		{(BR: BlueRain) => (<BR.Components.Text>I'm a dummy! 🤪 😎 👍 💯</BR.Components.Text>)}
	</BlueRainConsumer>
);

export default DummyComponent;