import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { BlueRainDecorator } from '../storybook/bluerain';

// Add BlueRain
const BRConfigs = require('../bluerain');
addDecorator(BlueRainDecorator(BRConfigs));

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /.stories.tsx$/);
function loadStories() {
	req.keys().forEach((filename) => req(filename));
}
configure(loadStories, module);
