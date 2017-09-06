/*
* This file demonstrates using BlueRain Client on web
*/
const plugins = require('./plugins');
const BR = require('@blueeast/bluerain-os').default;

const bootOptions = {
	plugins
};

BR.boot(bootOptions);
