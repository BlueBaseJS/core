import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { BlueRainDecorator } from '@blueeast/bluerain-storybook-addon';
import BR from '../src';

// Add BlueRain
const BRConfigs = require('../bluerain');
addDecorator(BlueRainDecorator(BRConfigs, BR));

// automatically import all files ending in *.stories.js
const req = require.context('../test/stories', true, /.stories.tsx$/);
function loadStories() {
	req.keys().forEach((filename) => req(filename));
}
configure(loadStories, module);
