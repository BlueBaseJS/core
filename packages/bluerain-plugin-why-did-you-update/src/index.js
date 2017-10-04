import React from 'react';
import { Plugin } from '@blueeast/bluerain-os';
const { whyDidYouUpdate } = require('why-did-you-update');

/**
 * A BlueRain Plugin to add [why-did-you-update](https://github.com/garbles/why-did-you-update) to test React performance.
 *
 * @property {string} pluginName "WhyDidYouUpdatePlugin"
 * @property {string} slug "why-did-you-update"
 */
class WhyDidYouUpdatePlugin extends Plugin {

	static pluginName = 'WhyDidYouUpdatePlugin';
	static slug = 'why-did-you-update';

	static initialize(config, ctx) {
		whyDidYouUpdate(React);
	}
}

export default WhyDidYouUpdatePlugin;
