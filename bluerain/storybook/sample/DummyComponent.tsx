import { BlueRain, BlueRainConsumer } from '@blueeast/bluerain';
import React from 'react';

const DummyComponent = () => (
	<BlueRainConsumer>
		{(_BR: BlueRain) => (<div>I'm a dummy! 🤪 😎 👍 💯</div>)}
	</BlueRainConsumer>
);

export default DummyComponent;