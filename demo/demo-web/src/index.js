/*
* This file demonstrates using BlueRain Client on web
*/
const BR = require('@blueeast/bluerain-os').default;
const config = require('./config');
const plugins = require('./plugins');

const bootOptions = {
	config,
	plugins
};

BR.boot(bootOptions);
